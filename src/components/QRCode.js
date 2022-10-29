import QrReader from 'modern-react-qr-reader'
import './QRCode.css';
import Navbar from "./Navbar";
import { useState } from 'react';

const BASE_IRI = process.env.REACT_APP_BASE_IRI ? process.env.REACT_APP_BASE_IRI : "http://localhost:3000";

const QRCode = (props) => {
  const [data, setData] = useState('Á espera de um QR Code...');

  return (
    <div className='QRCode'>
      <Navbar />
      <div className='QRCode-container'>
        <div id="info">{data}</div>
        <QrReader
          facingMode={"environment"}
          dekay={500}
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);

              
              // redirect to team page if url is valid
              if (result?.text.includes(BASE_IRI)) {
                window.location.href = result?.text;
              }
              else {
                setData("QR Code inválido");
              }
            }

            if (!!error) {
              console.log(error);
            }
          }}
        />
        </div>
    </div>
  );
};

export default QRCode;