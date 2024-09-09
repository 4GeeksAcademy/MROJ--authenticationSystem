import React, { useContext } from "react";
import { Context } from "../store/appContext";
import image from "../../img/login.png";
import "../../styles/home.css";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = {
      email: form.email.value,
      password: form.password.value
    };

    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      sessionStorage.setItem('access_token', data.access_token);
      navigate('/private');  

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error"
      });
    }
  };


  return (
    <div>
      <section className="bg-light p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-11">
              <div className="card border-light-subtle shadow-sm">
                <div className="row g-0">
                  <div className="col-12 col-md-6">
                    <img className="img-fluid rounded-start w-100 h-100 object-fit-cover" src={image} />
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="col-12 col-lg-11 col-xl-10">
                      <div className="card-body p-3 p-md-4 p-xl-5">
                        <h4 className="text-center"><strong>Login</strong></h4>
                        <br />
                        <form onSubmit={handleSubmit}>
                          <div className="row gy-3 overflow-hidden">
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" required />
                                <label htmlFor="email" className="form-label">Email</label>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input type="password" className="form-control" name="password" id="password" placeholder="Password" required />
                                <label htmlFor="password" className="form-label">Contraseña</label>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="d-grid">
                                <button className="btn btn-primary btn-lg" type="submit">Log in</button>
                              </div>
                            </div>
                          </div>
                        </form>
                        <div className="row">
                          <div className="col-12">
                            <div className="d-flex mt-5">
                              <a href="/signup" className="link-secondary text-decoration-none">Crear nueva cuenta</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};