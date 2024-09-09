from flask import Blueprint, request, jsonify
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/users', methods=['GET', 'POST'])
def handle_users():
    if request.method == 'GET':
        users = User.query.all()  
        users_serialized = [user.serialize() for user in users]  
        return jsonify(users_serialized), 200
    
    if request.method == 'POST':
        data = request.get_json()
        new_user = User(
            name=data['name'],
            lastname=data['lastname'],
            address=data['address'],  
            email=data['email'],
            password=data['password'] 
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.serialize())

@api.route('/login', methods=['POST'])
def login():
    username = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=username, password=password).first()

    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

@api.route('/logout', methods=['POST'])
def logout():
    return jsonify({"msg": "Logout successful"}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
