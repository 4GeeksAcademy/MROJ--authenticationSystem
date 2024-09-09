import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Context } from "../store/appContext"; 
import Swal from 'sweetalert2';

export const Private = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const token = sessionStorage.getItem("access_token");

    useEffect(() => {
        if (!token) {
            Swal.fire({
                title: '¡Acceso Denegado!',
                text: 'Necesitas loguearte para acceder a esta página.',
                icon: 'warning',
                confirmButtonText: 'Ir al Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            });
        }
    }, [token, navigate]);

    if (!token) {
        return null;
    }

    return (
        <div className="text-center mt-5">
            <h1>Bienvenido a la página privada</h1>
            <p>
                <img src={rigoImageUrl} alt="Rigo" />
            </p>
            <div className="alert alert-info">
                {store.message || "Loading message from the backend (make sure your python backend is running)..."}
            </div>
            <p>
                This boilerplate comes with lots of documentation:{" "}
                <a href="https://start.4geeksacademy.com/starters/react-flask">
                    Read documentation
                </a>
            </p>
        </div>
    );
};
