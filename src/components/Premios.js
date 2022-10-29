import './Premios.css';
import Navbar from "./Navbar";
import React, { useEffect } from "react";
import Prizes from './Prizes';

function Premios() {
    useEffect(() => {
        // select navbar tab
        const nav = document.querySelector(".Navbar");
        nav.querySelector(`a[href="${window.location.pathname}"]`)?.classList.add("selected-nav");
    }, []);    

    return (
        <div className="Premios">
            <Navbar />
            <div className="textp-cabecalho">Prémios</div>
            <div className="premios-container">
                <Prizes/>
            </div>
        </div>
    );
}

export default Premios;