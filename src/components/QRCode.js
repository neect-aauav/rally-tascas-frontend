import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'

class QRCode extends Component {
    constructor(props){
      super(props)
      this.state = {
        delay: 100,
        result: 'No result',
      }
  
      this.handleScan = this.handleScan.bind(this)
      this.facingMode = 'rear'
    }

    handleScan(data){
      this.setState({
        result: data,
      })
    }

    handleError(err){
      // add error message to info div
      document.getElementById('info p').innerHTML = err;
    }
    
    render(){
      const previewStyle = {
        width: 320,
      }
  
      return(
        <div>
          <QrReader
            delay={this.state.delay}
            style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
            />
          <div id="info">
            <p>{this.state.result}</p>
          </div>
        </div>
      )
    }
}

export default QRCode;