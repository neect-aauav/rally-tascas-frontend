import {Html5QrcodeScanner} from "html5-qrcode"
import { useEffect } from "react";
import Navbar from "./Navbar";

function QRCodeReader() {

    function onScanSuccess(decodedText, decodedResult) {
        // handle the scanned code as you like, for example:
        console.log(`Code matched = ${decodedText}`, decodedResult);
        window.location.href = decodedResult;
    }
    
    function onScanFailure(error) {
        // handle scan failure, usually better to ignore and keep scanning.
        // for example:
        console.warn(`Code scan error = ${error}`);
    }
      
    useEffect (() => {
        let html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: {width: 250, height: 250} },
            /* verbose= */ false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    }, []);

    return (
        <div className="QRCodeReader">
            <Navbar />
            <div className="QRCodeReader-container">
                <h1 className="QRCodeReader-title">QR Code Reader</h1>
                <div id="reader"></div>
            </div>
        </div>
    );
}

export default QRCodeReader;