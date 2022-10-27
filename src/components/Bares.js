import React,{useState,useEffect} from "react";
import './Bares.css';
import Navbar from "./Navbar";

const API_URL = process.env.API_URL ? process.env.API_URL : "http://127.0.0.1:8000";

function Bares() {

    async function getPostos() {
        const response = await fetch(API_URL+"/api/bars");
        return await response.json();
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
                    localstor(0, button.id)
                    window.location.href = "/admin/equipas";
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
        writebutton(data,document.querySelector("#tabelabares"));
    });

    function localstor(flag, posto) {
        if (flag === 0) {
            localStorage.setItem('bar', posto);
        }
    }
    


    return (
        <div className="Bares">
            <Navbar />
            <h1 className="titulo">Em que bar/posto te encontras?</h1>
            <div className="basebares">
                <div className="tabelabares" id="tabelabares">
                    
                </div>
            </div>
        </div>
    );
}

export default Bares;
