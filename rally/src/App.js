import React from 'react';
import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Postos from './components/Postos';
import Premios from './components/Premios';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/postos" element={<Postos/>} />
          <Route exact path="/premios" element={<Premios/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
