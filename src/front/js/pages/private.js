import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
	const { store, actions } = useContext(Context);
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    useEffect(
        () => { 
            const token = localStorage.getItem('jwt-token');

            if(token === null){
                navigate("/login")
            }
        
            fetch("https://automatic-space-eureka-r4r6vxqj6x4rcw65-3001.app.github.dev/api/private",{
                method:'GET',
                headers: { 
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                  } 
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => setUser(data))
                .catch((error) => console.error('Fetch error:', error));
        },[])
        // localStorage.removeItem("jwt-token")
	return (
		<div className="d-flex justify-content-center align-items-center h-75 ">
			<div className= " p-5 rounded-3 shadow">
                {user && user.email ? (
                    <>
                        <h1 className="text-center mb-5">Current User</h1>
                        <h2>email: {user.email}  </h2>
                        <h2>is active: {user.is_active ? 'Yes' : 'No'}</h2>
                        <h2>id: {user.id}</h2>
                    </>
                )
                    :(<h1>loading..</h1>)}
            </div>
			
		</div>
	);
};
