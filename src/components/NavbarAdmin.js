import React from "react";
import './Navbar.css';
import NEECT_2 from '../images/NEECT.png';
import {Link} from 'react-router-dom';

import TROPHY from '../images/trophy.png';
import TEAMS from '../images/team.png';
import BEER from '../images/beer.png';
import LOGOUT from '../images/logout.png';
import SCANNER from '../images/scanner.png';

// import check sessions functions
import {checkSession, checkBar} from './checksession';

const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://127.0.0.1:8000";

function NavbarAdmin() {
    
    checkSession(API_URL, ['/login']);
    checkBar(['/login', '/admin/bares']);

    // clear token and redirect to login
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('bar');
        window.location.href = '/login';
    }

    return (
        <nav>
            <div className="Navbar">
                <Link to="/"><img src={TROPHY} /><h1 className="home-text">Score</h1></Link>
                <Link to="/admin/bares"><img src={BEER} /><h1 className="home-text">Bares</h1></Link>
                <Link to="/admin/qrcode"><img src={SCANNER} /><h1 className="home-text">Scanner</h1></Link>
                <Link to="/admin/equipas"><img src={TEAMS} /><h1>Equipas</h1></Link>
                <Link onClick={logout} to="#"><img src={LOGOUT} /><h1 className="Bares-text">Sair</h1></Link>
            </div>
        </nav>
    );
}

export default NavbarAdmin;