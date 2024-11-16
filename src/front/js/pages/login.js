import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msgError, setMsgError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => { 
        e.preventDefault();
        
        setMsgError(null)

        const raw = {
            email: email,
            password: password
        };
        console.log(raw);
        
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(raw)
        };
   
        fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    setMsgError("Bad email or password")
                    throw new Error('Network response was not ok');
                }
                return response.json(); 
            })
            .then((result) =>  {
                localStorage.setItem("jwt-token", result.access_token);
                actions.changeAuthenticated(true)
                console.log(localStorage.getItem('jwt-token'));
                
                navigate("/private");
            })
            .catch((error) => {
                console.error('Fetch error:', error)
                
            });
    };

	return (
		<div className="d-flex justify-content-center align-items-center h-75 ">
			<div className= " p-5 rounded-3 shadow">
                <form onSubmit = {handleSubmit}>
                    <h2 className="text-center mb-3">Log in</h2>
                    <div className="mb-4">
                        <label htmlFor = "email">Email</label>
                        <input type = "email" className="form-control" id = "email" value={email} onChange ={(e)=>setEmail(e.target.value)} placeholder="Enter email"></input>
                    </div>
                    <div className="mb-4">
                        <label htmlFor = "password">Password</label>
                        <input type = "password" className="form-control" id= "password" value={password} onChange ={(e)=>setPassword(e.target.value)} placeholder="Enter password"></input>
                        <p className="text-danger">{msgError ? msgError:null}</p>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </div>
                    <p>don't have an account? <Link to="/signup">register</Link></p>
                </form>
            </div>
			
			
		</div>
	);
};
