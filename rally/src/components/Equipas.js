import React,{useState,useEffect} from "react";
import './Equipas.css';
import Navbar from "./Navbar";


function Equipas() {


    async function getPostos() {
        const response = await fetch("http://localhost:8000/api/teams");
        const data = await response.json();
        // console.log(data);
        return data;
    }

    function writebutton(data,parent){
        if(parent){
            data.forEach(button => {
                const buttonwrapper = document.createElement('div')
                parent.appendChild(buttonwrapper)
                buttonwrapper.classList.add("buttonbar")
                buttonwrapper.onclick = () => {
                    localstor(0, button.id)
                    window.location.href = "/equipas/"+button.id;
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

    function localstor(flag,postoname) {
        if (flag === 0) {
            localStorage.setItem('teamid', postoname);
        }
    }
    return (
        <div className="Bares">
            <Navbar />
            <h1 className="titulo1">Escolhe a equipa</h1>
            <div className="basebares">
                <div className="tabelaequipas" id="tabelaequipas">
                    
                </div>
            </div>
        </div>
    );
}

export default Equipas;