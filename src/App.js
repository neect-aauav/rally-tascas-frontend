import React from 'react';
import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Postos from './components/Postos';
import Premios from './components/Premios';
import Login from './components/Login';
import Bares from './components/Bares';
import Equipas from './components/Equipas';
import Equipa from './components/Equipa';
import Membros from './components/Membros';
import QRCode from './components/QRCode';

import HALLOWEEN_BK from './images/halloween-bk.jpeg';

const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://127.0.0.1:8000";

// force https
if (window.location.protocol != "https:" && window.location.hostname != "localhost")
  window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);

function App() {

  checkSession(['/login']);
  checkBar(['/login', '/admin/bares']);

  return (
    <div style={{ backgroundImage: `url(${HALLOWEEN_BK})` }} className="App">
      <Router>
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route  path="/login" element={<Login/>} />
          <Route  path="/postos" element={<Postos/>} />
          <Route  path="/premios" element={<Premios/>} />
          <Route  path="/membros" element={<Membros/>} />
          <Route  path="/qrcode" element={<QRCode/>} />
          <Route  path="/admin/bares" element={<Bares/>} />
          <Route  path="/admin/equipas" element={<Equipas/>} />
          <Route  path="/admin/equipas/:id" element={<Equipa/>} />
        </Routes>
      </Router>
    </div>
  );
}

// check authentication token validity
// pass not applicable paths as an array
const checkSession = notApplicablePaths => {
  if (!notApplicablePaths.includes(window.location.pathname) && window.location.pathname.includes('/admin')) {

    const token = localStorage.getItem('token');
    if (token) {
        // check if token is valid
        fetch(API_URL+'/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token}),
        })
        .then(res => res.json())
        .then(data => {
            if (!(data.status && data.status == 200)) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        });
    }
    else
        window.location.href = '/login';
  }
}

// check if bar is selected
// pass not applicable paths as an array
const checkBar = notApplicablePaths => {
  if (!notApplicablePaths.includes(window.location.pathname) && window.location.pathname.includes('/admin')) {
    if (!localStorage.getItem('bar')) {
      window.location.href = '/admin/bares';
    }
  }
}

export default App;
