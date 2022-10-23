import React,{render} from "react";
import './Postos.css';
import Navbar from "./Navbar";
import { MapContainer,TileLayer,Marker,Popup } from 'react-leaflet';
function Postos() {
    
    
    return (
        <div className="Postos">
            <Navbar />
            <h1 className="textp-cabecalho">Descobre por onde tens de passar!</h1>
            <div className="basemapa">
                <MapContainer center={[40.61117003565200, -8.653995146982000]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[40.64382661695054, -8.655127674722474]}>
                    <Popup>
                    Casa Pina <br /> 
                    </Popup>
                </Marker>
                <Marker position={[40.64291964216214, -8.654945888213359]}>
                    <Popup>
                    Bar posto 7 <br /> 
                    </Popup>
                </Marker>
                <Marker position={[40.64235063917928, -8.65385375752226]}>
                    <Popup>
                    Golfinho Bar <br />
                    </Popup>
                </Marker>
                <Marker position={[40.64236057534645, -8.655132403558937]}>
                    <Popup>
                    Dock <br />
                    </Popup>
                </Marker>
                <Marker position={[40.63259224969681, -8.651403558885985]}>
                    <Popup>
                    Macaca <br /> MacDonalds
                    </Popup>
                </Marker>
                <Marker position={[40.63895655972107, -8.656326457457263]}>
                    <Popup>
                    Parque do Drinks <br /> 
                    </Popup>
                </Marker>
                <Marker position={[40.6295750080371, -8.656427584219601]}>
                    <Popup>
                    Meia Lua <br /> 
                    </Popup>
                </Marker>
                <Marker position={[40.62365311138041, -8.657516997204388]}>
                    <Popup>
                    Essua <br /> 
                    </Popup>
                </Marker>
                </MapContainer>
            </div>
        </div>
    );
}

export default Postos;