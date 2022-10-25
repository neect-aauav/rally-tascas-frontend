import React from 'react';
import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Postos from './components/Postos';
import Premios from './components/Premios';
import Login from './components/Login';
import Bares from './components/Bares';
import Equipas from './components/Equipas';

function App() {

  const checkSession = () => {
    const notApplicablePaths = ['/login'];
    if (!notApplicablePaths.includes(window.location.pathname)) {

      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
          // check if token is valid
          fetch('http://localhost:3001/api/token', {
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

  checkSession();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route  path="/login" element={<Login/>} />
          <Route  path="/postos" element={<Postos/>} />
          <Route  path="/premios" element={<Premios/>} />
          <Route  path="/bares" element={<Bares/>} />
          <Route  path="/equipas" element={<Equipas/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
