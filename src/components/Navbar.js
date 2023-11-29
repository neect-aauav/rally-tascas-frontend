import React from "react";
import './Navbar.css';
import {Link} from 'react-router-dom';

import TROPHY from '../images/trophy.png';
import MEMBERS from '../images/members.png';
import BEER from '../images/beer.png';
import PRIZE from '../images/prize.png';
import PERSON from '../images/person.png';

function Navbar() {
    const isMobile = window.innerWidth <= 768; // Check if it's a mobile device
    
    return (
      <nav>
        <div className="Navbar">
          <Link to="/">
            <img src={TROPHY} alt="thropy"/>
            <h1 className="home-text">Score</h1>
          </Link>
          <Link to="/membros">
            <img src={MEMBERS} alt="members"/>
            <h1>Membros</h1>
          </Link>
          <Link to="/postos">
            <img src={BEER} alt="beer"/>
            <h1 className="Bares-text">Postos</h1>
          </Link>
          <Link to="/premios">
            <img src={PRIZE} alt="prize"/>
            <h1 className="Premios-text">Prémios</h1>
          </Link>
          <Link to="/login">
            <img src={PERSON} alt="Núcleos" style={{width: isMobile ? '19px' : '15px'}}/>
            <h1 className="Nucleos-text">Núcleos</h1>
          </Link>
        </div>
      </nav>
    );
}

export default Navbar;