import React, { useEffect } from "react";
import './Login.css';
import Navbar from "./NavbarAdmin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {checkLogin} from './checksession';
import { useNavigate } from "react-router-dom";
import NEECT from "../images/NEECT.png";
import NEEET from "../images/NEEET.png";
import NEEQu from "../images/NEEQu.png";
import NRock from "../images/NRock.png";

const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://127.0.0.1:8000";

function Login() {
    const navigate = useNavigate();

    // check if user is already logged in
    checkLogin(navigate, API_URL);

    async function getPostos() {
        const response = await fetch(API_URL+"/api/login",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            })
        });
        if (response.status === 400) {
            console.log("Wrong username or password");
            toast.error('Password incorreta! Tenta outra vez.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }else if (response.status === 200) {
            console.log("Login successful");
            toast.success('Login feito com sucesso!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                //set in local storage data
                const data = await response.json();
                //set in local storage data
                localStorage.setItem('token', data.token);
                // reset bar for new admin user
                localStorage.removeItem('bar');
                
                navigate("/admin/bares")
        }else{
            console.log("Something went wrong");
        }
    }

    // enter key press event
    useEffect(() => {
        document.addEventListener("keydown", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.querySelector(".login-button").click();
            }
        });
    }, []);
        
    return (
        <div className="Login">
            <Navbar />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {/* create login with username and password inputs */}
            <div className="login">
                <h1>Admin</h1>
                <div className="formulario">
                    <input type="text" id="username" name="username" placeholder="Username" className="username"/>
                    <input type="password" id="password" name="password" placeholder="Password" className="password"/>
                    <button className="login-button" onClick={getPostos}>Login</button>
                </div>
                <div className="logo-container">
                    <div className="logo-row">
                        <div>
                            <img src={NEECT} alt="NEECT" />
                        </div>
                        <div>
                            <img src={NRock} alt="NRock" />
                        </div>
                    </div>
                    <div className="logo-row">
                        <div>
                            <img src={NEEET} alt="NEEET" />
                        </div>
                        <div>
                            <img src={NEEQu} alt="NEEQu" />
                        </div>
                    </div>
                </div>
        </div>
    </div>
    );  
}

export default Login;