import React from "react";
import './Navbar.css';
import NEECT_2 from '../images/NEECT.png';
import {Link} from 'react-router-dom';

import TROPHY from '../images/trophy.png';
import MEMBERS from '../images/members.png';
import BEER from '../images/beer.png';
import PRIZE from '../images/prize.png';

function Navbar() {
    return (
        <nav>
            <div className="Navbar">
                <Link to="/"><img src={TROPHY} /><h1 className="home-text">Score</h1></Link>
                <Link to="/membros"><img src={MEMBERS} /><h1>Membros</h1></Link>
                <Link to="/postos"><img src={BEER} /><h1 className="Bares-text">Postos</h1></Link>
                <Link to='/premios'><img src={PRIZE} /><h1 className="Premios-text">Prémios</h1></Link>
                <Link to='/login' className="logo">
                    <img src={NEECT_2} alt="NEECT"/>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;