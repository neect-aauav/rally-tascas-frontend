import React from "react";
import './Navbar.css';
import NEECT_2 from '../images/NEECT.png';
import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <div className="Navbar">
                <Link to='/login' className="logo">
                    <img src={NEECT_2} alt="NEECT"/>
                </Link>
                <Link to="/"><h1 className="home-text">Score</h1></Link>
                <Link to="/membros"><h1>Membros</h1></Link>
                <Link to="/postos"><h1 className="Bares-text">Postos</h1></Link>
                <Link to='/premios'><h1 className="Premios-text">Prémios</h1></Link>
            </div>
        </nav>
    );
}

export default Navbar;