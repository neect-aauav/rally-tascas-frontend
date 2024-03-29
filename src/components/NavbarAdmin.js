import React from "react";
import './Navbar.css';
import {Link, useNavigate} from 'react-router-dom';

import TROPHY from '../images/trophy.png';
import TEAMS from '../images/team.png';
import BEER from '../images/beer.png';
import LOGOUT from '../images/logout.png';
import SCANNER from '../images/scanner.png';

// import check sessions functions
import {checkSession, checkBar} from './checksession';

const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://127.0.0.1:8000";

function NavbarAdmin() {
    const navigate = useNavigate();
    
    checkSession(navigate, API_URL, ['/login']);
    checkBar(navigate, ['/login', '/admin/bares']);

    // clear token and redirect to login
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('bar');
        window.location.href = '/login';
    }

    return (
        <nav>
            <div className="Navbar">
                <Link to="/"><img src={TROPHY} alt="home"/><h1 className="home-text">Score</h1></Link>
                <Link to="/admin/bares"><img src={BEER} alt="bars"/><h1 className="home-text">Bares</h1></Link>
                <Link to="/admin/qrcode"><img src={SCANNER} alt="qrcode"/><h1 className="home-text">Scanner</h1></Link>
                <Link to="/admin/equipas"><img src={TEAMS} alt="teams"/><h1>Equipas</h1></Link>
                <Link onClick={logout} to="#"><img src={LOGOUT} alt="logout"/><h1 className="Bares-text">Sair</h1></Link>
            </div>
        </nav>
    );
}

export default NavbarAdmin;