import React from "react";
import './Navbar.css';
import NEECT_2 from '../images/NEECT_2.png';
import disableScroll from 'disable-scroll';
import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <div className="Navbar">
                <Link to="/"><h1 className="home-text">Home</h1></Link>
                <Link to="/postos"><h1 className="Bares-text">Bares/Postos</h1></Link>
                <Link to='/premios'><h1 className="Premios-text">Prémios</h1></Link>
                <Link to='/login'>
                    <img className="logo" src={NEECT_2} alt="NEECT"/>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;