import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('jwt-token'); 
		actions.changeAuthenticated(false)
		navigate("/login"); 
	};
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				{store.authenticated ? (
					<Link to="/private">
						<span className="navbar-brand mb-0 h1">Private</span>
					</Link>
					):<></>}
				<div className="ml-auto">
					{store.authenticated ? (
						
						<Link to="/login">
							<button className="btn btn-primary"  onClick={handleLogout}>Log out</button>
						</Link>
					):(
						<Link to="/login">
							<button className="btn btn-primary">Log in</button>
						</Link>
					)}
					
				</div>
			</div>
		</nav>
	);
};
