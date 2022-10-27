import React, { useEffect } from "react";
import './Login.css';
import Navbar from "./Navbar";
import {ToastContainer,toast,Zoom,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    async function getPostos() {
        const response = await fetch("https://rally-api.herokuapp.com/api/login",
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
            toast.error('🐂 Caa Burro!', {
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
            toast.success('Éss bue smart!', {
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
                
                window.location.href = "/bares"
        }else{
            console.log("Something went wrong");
        }
    }
        
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
                    <h1>Login</h1>
                    <div className="formulario">
                            <input type="text" id="username" name="username" placeholder="Username" className="username"/>
                            <input type="password" id="password" name="password" placeholder="Password" className="password"/>
                    <div/>
                    <button className="login-button" onClick={getPostos}>Login</button>
                </div>
            </div>
            </div>
        );
    }

export default Login;