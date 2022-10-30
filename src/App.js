import React,{useState,useEffect} from "react";
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
import { useNavigate } from "react-router-dom";

import ARROW from './images/arrow.png';

import 'swiped-events';

// force https
if (window.location.protocol != "https:" && window.location.hostname != "localhost")
  window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);

function App() {

  // only show arrow at a certain distance from top
  const handleScroll = () => {
    if (window.scrollY > 200) {
      document.querySelector(".go-up").style.display = "block";
    } else {
      document.querySelector(".go-up").style.display = "none";
    }
  }
  
  const navigate = useNavigate();

  useEffect(() => {
    const routesToSkip = ["/postos"];

    document.addEventListener('swiped-right', () => {
      if (!routesToSkip.includes(window.location.pathname) && !window.location.pathname.includes("/admin")) {
        const nav = document.querySelector(".Navbar");
        const selected = nav.querySelector(".selected-nav");
        let prev = selected.previousElementSibling;
        if (prev)
          navigate(prev.getAttribute("href"));
        else
          navigate(nav.lastElementChild.previousElementSibling.getAttribute("href"));
        }
    });

    document.addEventListener('swiped-left', () => {
      if (!routesToSkip.includes(window.location.pathname) && !window.location.pathname.includes("/admin")) {
        const nav = document.querySelector(".Navbar");
        const selected = nav.querySelector(".selected-nav");
        const next = selected.nextElementSibling.classList.contains("logo") ? nav.firstElementChild : selected.nextElementSibling;
        if (next)
          navigate(next.getAttribute("href"));
        else
          navigate(nav.firstElementChild.getAttribute("href"));
        }
    });

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
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

       {/* go up button */}
       <div style={{display: "none"}} className="go-up" onClick={() => window.scrollTo(0, 0)}>
          <div className="go-up-arrow"><img src={ARROW}></img></div>
        </div>
    </div>
  );
}

export default App;
