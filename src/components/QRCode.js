import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import './QRCode.css';
import Navbar from "./Navbar";

const BASE_IRI = process.env.REACT_APP_BASE_IRI ? process.env.REACT_APP_BASE_IRI : "http://localhost:3000";

class QRCode extends Component {
    constructor(props){
      super(props)
      this.state = {
        delay: 100,
        result: 'À espera de um QR Code...',
      }
  
      this.handleScan = this.handleScan.bind(this)
      this.facingMode = 'rear'
    }

    handleScan(data){
      if (data && data.text) {
        this.setState({
          result: data.text,
        })

        // redirect to team page if url is valid
        if (data.text.includes(BASE_IRI)) {
          window.location.href = data.text;
        }
        else {
          document.getElementById('info').innerHTML = 'QR Code inválido';
        }
      }
    }

    handleError(err){
      // add error message to info div
      document.getElementById('info').innerHTML = err;
    }
    
    render(){
      const previewStyle = {
        width: 320,
      }
  
      return(
        <div className='QRCode'>
          <Navbar />
          <div className='QRCode-container'>
            <QrReader
              delay={this.state.delay}
              style={previewStyle}
              onError={this.handleError}
              onScan={this.handleScan}
              />
            <div id="info">{this.state.result}</div>
          </div>
        </div>
      )
    }
}

export default QRCode;