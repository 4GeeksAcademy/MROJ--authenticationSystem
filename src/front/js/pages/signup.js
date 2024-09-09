import React, { useContext} from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/icon.png";
import "../../styles/home.css";
import Swal from 'sweetalert2'



export const SignUp = () => {
    const { store, actions } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const form = e.target;
        const formData = {
            name: form.name.value,
            lastname: form.lastname.value,
            address: form.address.value,
            email: form.email.value,
            password: form.password.value
        };

        try {
            const response = await fetch(process.env.BACKEND_URL + "/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                Swal.fire({
                    title: "Usuario registrado",
                    icon: "success",
                    confirmButtonText: 'Ir al login'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/';
                    }
                });
            } 
        } catch (error) {
            console.error("Hubo un error:", error);
        }
    };


    return (
        <section className="">
            <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
                <div className="container">
                    <div className="row gx-lg-5 align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <img height="250" src={rigoImageUrl} alt="icono" />
                            <h1 className="my-5 display-3 fw-bold ls-tight">
                                ¡Registra tu <br />
                                <span className="text-primary">cuenta ahora! </span>
                            </h1>
                            <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                            Lorem ipsum dolor sit amet consectetur adipiscing elit semper, morbi rutrum fringilla metus turpis montes
                            </p>
                        </div>

                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="card">
                                <div className="card-body py-5 px-md-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input type="text" id="name" className="form-control" name="name" />
                                                    <label className="form-label" htmlFor="name">Nombre</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input type="text" id="lastname" className="form-control" name="lastname" />
                                                    <label className="form-label" htmlFor="lastname">Apellido</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="text" id="address" className="form-control" name="address" />
                                            <label className="form-label" htmlFor="address">Dirección</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="email" id="email" className="form-control" name="email" />
                                            <label className="form-label" htmlFor="email">Correo electrónico</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password" id="password" className="form-control" name="password" />
                                            <label className="form-label" htmlFor="password">Contraseña</label>
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};