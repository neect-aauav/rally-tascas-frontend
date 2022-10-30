import QrReader from 'modern-react-qr-reader'
import './QRCode.css';
import Navbar from "./NavbarAdmin";
import { useNavigate } from 'react-router-dom';
import React,{useState,useEffect} from "react";

const BASE_IRI = process.env.REACT_APP_BASE_IRI ? process.env.REACT_APP_BASE_IRI : "http://localhost:3000";

const QRCode = () => {
  const navigate = useNavigate();

  const [result, setResult] = useState('À espera de um QR Code...');

  useEffect(() => {
    // select navbar tab
    const nav = document.querySelector(".Navbar");
    nav.querySelector(`a[href="${window.location.pathname}"]`)?.classList.add("selected-nav");
  }, []);

  const handleScan = (data) => {
    if (data) {
      setResult(data);

      // redirect to team page if the url is valid
      if (data.includes(BASE_IRI)) {
        navigate(data);
      }
      else {
        setResult("QR Code inválido");
      }
    }
  }

  const handleError = (err) => {
    console.error(err);
    setResult("Erro ao ler o QR Code");
  }

  return (
    <div className='QRCode'>
      <Navbar />
      <div className='QRCode-container'>
        <div id="info">{result}</div>
        <QrReader
          facingMode={"environment"}
          delay={100}
          onError={handleError}
          onScan={handleScan}
        />
        </div>
    </div>
  );
};

export default QRCode;