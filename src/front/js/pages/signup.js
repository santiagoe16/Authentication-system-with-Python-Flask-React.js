import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => { 
        e.preventDefault();
    
        const raw = {
            email: email,
            password: password,
            is_active: true
        };
    
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(raw)
        };
    
        fetch("https://automatic-space-eureka-r4r6vxqj6x4rcw65-3001.app.github.dev/api/signup", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Cambiado a json en vez de text
            })
            .then((result) => console.log(result))
            .catch((error) => console.error('Fetch error:', error));
    
        console.log('Email:', email);
        console.log('Password:', password);
    };

	return (
		<div className="d-flex justify-content-center align-items-center h-75 ">
			<div className= " p-5 rounded-3 shadow">
                <form onSubmit = {handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor = "email">Email</label>
                        <input type = "email" className="form-control" id = "email" value={email} onChange ={(e)=>setEmail(e.target.value)} placeholder="Enter email"></input>
                    </div>
                    <div className="mb-4">
                        <label htmlFor = "password">Password</label>
                        <input type = "password" className="form-control" id= "password" value={password} onChange ={(e)=>setPassword(e.target.value)} placeholder="Enter password"></input>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Signup</button>
                    </div>
                </form>
            </div>
			
			{/* <Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link> */}
		</div>
	);
};
