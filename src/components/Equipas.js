import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Bares.css';
import Navbar from "./NavbarAdmin";

const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://127.0.0.1:8000";

function Equipas() {
    const navigate = useNavigate();

    useEffect(() => {
        // select navbar tab
        const nav = document.querySelector(".Navbar");
        nav.querySelector(`a[href="${window.location.pathname}"]`)?.classList.add("selected-nav");
      }, []);

    async function getPostos() {
        const response = await fetch(API_URL+"/api/teams");
        const data = await response.json();
        // console.log(data);
        return data;
    }

    function writebutton(data,parent){
        if(parent){
            // remove existing buttons
            document.querySelectorAll('.buttonbar').forEach(e => e.remove());

            data.forEach(button => {
                const buttonwrapper = document.createElement('div')
                parent.appendChild(buttonwrapper)
                buttonwrapper.classList.add("buttonbar")
                buttonwrapper.onclick = () => {
                    navigate("/admin/equipas/"+button.id);
                }
                const h1 = document.createElement('h1')
                buttonwrapper.appendChild(h1)
                h1.classList.add('barnames')
                h1.innerText=button.name
            });
        }
    }


    getPostos().then((data) => {
        // console.log(data);
        writebutton(data,document.querySelector("#tabelaequipas"));
    });

    return (
        <div className="Bares">
            <Navbar />
            <h1 className="textp-cabecalho">Escolhe a equipa</h1>
            <div className="basebares">
                <div className="tabelabares" id="tabelaequipas">
                    
                </div>
            </div>
        </div>
    );
}

export default Equipas;