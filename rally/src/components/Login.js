import React, { useEffect } from "react";
import './Login.css';
import Navbar from "./Navbar";

function Login() {
        const [email, setEmail] = React.useState("");
        const [password, setPassword] = React.useState("");

        fetch("http://localhost:8000/api/token", result => {
            const data = result.json();
            const token = data.token;
        });

        
        //function get the value of the input
        function getValues(){
            //check if the values are correct
            if(document.getElementById("username").value == 'ola' && document.getElementById("password").value == 'ola'){
                console.log("Login Successful");
            }
            else{
                console.log("Login Failed");
            }
        }   


        return (
            <div className="Login">
                <Navbar />
                {/* create login with username and password inputs */}
                <div className="login">
                    <h1>Login</h1>
                    <div className="formulario">
                            <input type="text" id="username" name="username" placeholder="Username" className="username"/>
                            <input type="password" id="password" name="password" placeholder="Password" className="password"/>
                    <div/>
                    <button className="login-button" onClick={getValues}>Login</button>
                </div>
            </div>
            </div>
        );
    }

export default Login;