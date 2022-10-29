import QrReader from 'modern-react-qr-reader'
import './QRCode.css';
import Navbar from "./Navbar";
import { Component } from 'react';

const BASE_IRI = process.env.REACT_APP_BASE_IRI ? process.env.REACT_APP_BASE_IRI : "http://localhost:3000";

class QRCode extends Component {
  constructor(props) {
        super(props);

        this.state = {
            result: 'À espera de um QR Code...'
        }

        this.handleError = this.handleError.bind(this);
        this.handleScan = this.handleScan.bind(this);
    }

  handleScan = (data) => {
    if (data) {
      this.state.result = data;

      // redirect to team page if the url is valid
      if (data.includes(BASE_IRI)) {
        window.location.href = data.text;
      }
      else {
        this.state.result = "QR Code inválido";
      }
    }
  }

  handleError = (err) => {
    console.error(err);
    this.state.result = "Erro ao ler o QR Code";
  }

  render() {
    return (
      <div className='QRCode'>
        <Navbar />
        <div className='QRCode-container'>
          <div id="info">{this.state.result}</div>
          <QrReader
            facingMode={"environment"}
            dekay={500}
            onError={this.handleError}
            onScan={this.handleScan}
          />
          </div>
      </div>
    );
  }
};

export default QRCode;