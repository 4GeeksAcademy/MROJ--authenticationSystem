import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		sessionStorage.removeItem('access_token'); 
		navigate('/'); 
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div class="d-grid gap-2 d-md-block">
					<Link to="/demo">
					<button className="btn btn-primary" style={{ marginRight: '20px' }}>Check the Context in action</button>
					</Link>
					<button class="btn btn-danger" type="button"onClick={handleLogout}>
						Cerrar sesión
					</button>
				</div>
			</div>
		</nav>
	);
};