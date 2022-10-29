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
import QRCode from './components/QRCode.js';

import HALLOWEEN_BK from './images/halloween-bk.jpeg';

// force https
if (window.location.protocol != "https:" && window.location.hostname != "localhost")
  window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route  path="/login" element={<Login/>} />
          <Route  path="/postos" element={<Postos/>} />
          <Route  path="/premios" element={<Premios/>} />
          <Route  path="/membros" element={<Membros/>} />
          <Route  path="/admin/qrcode" element={<QRCode/>} />
          <Route  path="/admin/bares" element={<Bares/>} />
          <Route  path="/admin/equipas" element={<Equipas/>} />
          <Route  path="/admin/equipas/:id" element={<Equipa/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
