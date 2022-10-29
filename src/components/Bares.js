import React,{useState,useEffect} from "react";
import './Bares.css';
import Navbar from "./NavbarAdmin";

const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://127.0.0.1:8000";

function Bares() {

    useEffect(() => {
        // select navbar tab
        const nav = document.querySelector(".Navbar");
        nav.querySelector(`a[href="${window.location.pathname}"]`)?.classList.add("selected-nav");
      }, []);

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
                    
                    fetch(API_URL+"/api/admin/"+localStorage.getItem("token"), {
                        method: 'PATCH',
                        headers: {
                            'Authorization': 'Token '+localStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            "bar": button.id
                        })
                    }).then(response => console.log(response));
                    
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
            <h1 className="textp-cabecalho">Em que bar/posto te encontras?</h1>
            <div className="basebares">
                <div className="tabelabares" id="tabelabares">
                    
                </div>
            </div>
        </div>
    );
}

export default Bares;
