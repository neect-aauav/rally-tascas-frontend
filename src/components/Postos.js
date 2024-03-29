import React,{ useEffect, useState} from "react";
import './Postos.css';
import Navbar from "./Navbar";
import { MapContainer,TileLayer,Marker,Popup } from 'react-leaflet';

import THEME_LOGO from '../images/theme_logo.png';

import 'swiped-events';

const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://127.0.0.1:8000";

function Postos() {
    
    const [postolat0,setPostolat0] = useState(0);
    const [postolng0,setPostolng0] = useState(0);
    const [postolat1,setPostolat1] = useState(0);
    const [postolng1,setPostolng1] = useState(0);
    const [postolat2,setPostolat2] = useState(0);
    const [postolng2,setPostolng2] = useState(0);
    const [postolat3,setPostolat3] = useState(0);
    const [postolng3,setPostolng3] = useState(0);
    const [postolat4,setPostolat4] = useState(0);
    const [postolng4,setPostolng4] = useState(0);
    const [postolat5,setPostolat5] = useState(0);
    const [postolng5,setPostolng5] = useState(0);
    const [postolat6,setPostolat6] = useState(0);
    const [postolng6,setPostolng6] = useState(0);
    const [postolat7,setPostolat7] = useState(0);
    const [postolng7,setPostolng7] = useState(0);
    const [postoname0,setname0] = useState(0);
    const [postoname1,setname1] = useState(0);
    const [postoname2,setname2] = useState(0);
    const [postoname3,setname3] = useState(0);
    const [postoname4,setname4] = useState(0);
    const [postoname5,setname5] = useState(0);
    const [postoname6,setname6] = useState(0);
    const [postoname7,setname7] = useState(0);
    const [games, setGames] = useState([]);
    
    async function getPostos() {
        const response = await fetch(API_URL+"/api/bars");
        const data = await response.json();
        console.log(data);
        //read data[0].latitude to inside a string
        setPostolat0(data[0].latitude);
        setPostolng0(data[0].longitude);
        setPostolat1(data[1].latitude);
        setPostolng1(data[1].longitude);
        setPostolat2(data[2].latitude);
        setPostolng2(data[2].longitude);
        setPostolat3(data[3].latitude);
        setPostolng3(data[3].longitude);
        setPostolat4(data[4].latitude);
        setPostolng4(data[4].longitude);
        setPostolat5(data[5].latitude);
        setPostolng5(data[5].longitude);
        setPostolat6(data[6].latitude);
        setPostolng6(data[6].longitude);
        setPostolat7(data[7].latitude);
        setPostolng7(data[7].longitude);
        setname0(data[0].name);
        setname1(data[1].name);
        setname2(data[2].name);
        setname3(data[3].name);
        setname4(data[4].name);
        setname5(data[5].name);
        setname6(data[6].name);
        setname7(data[7].name);
        const gameData = data.map((bar) => ({
          id: bar.game.id,
          name: bar.game.name,
          description: bar.game.description,
        }));
        setGames(gameData);
        return data;
    }
    useEffect(() => {
        getPostos().then(bars =>  {
            // list bars
            const barsWrapper = document.querySelector(".bars-list");
            const barsTable = document.createElement("table");
            barsWrapper.appendChild(barsTable);

            // set headers
            const headers = ["ID", "Nome", "Endereço", "Jogo", "Pontos", "Bebidas"];
            const headersRow = document.createElement("tr");
            barsTable.appendChild(headersRow);
            headers.forEach(header => {
                const headerCell = document.createElement("th");
                headerCell.innerText = header;
                headersRow.appendChild(headerCell);
            });

            bars.sort((a,b) => a.id - b.id)
                .forEach(bar => {
                    const rowContent = [bar.id, bar.name, bar.address, bar.game.name, bar.points, bar.drinks];
                    const row = document.createElement("tr");
                    barsTable.appendChild(row);
                    rowContent.forEach(content => {
                        const cell = document.createElement("td");
                        cell.innerText = content;
                        row.appendChild(cell);
                    });
                });
        });
       
        // theme_logo image
        const theme_logo = document.createElement('img');
        theme_logo.src = THEME_LOGO;
        theme_logo.classList.add('theme_logo');
        document.querySelector(".equipas").appendChild(theme_logo);

        // select navbar tab
        const nav = document.querySelector(".Navbar");
        nav.querySelector(`a[href="${window.location.pathname}"]`)?.classList.add("selected-nav");

    }, []);
    
    
    return (
        <div className="Postos">
            <Navbar />
            <div className="textp-cabecalho">Descobre por onde tens de passar!</div>
            <div className="bars-container">
                <div className="basemapa">
                    {/* create a map container that contains lat value of postolat0 and long value of postolng0 */}
                    <MapContainer center={[40.61117003565200, -8.653995146982000]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[postolat0, postolng0]}>
                        <Popup>
                        {postoname0} <br /> 
                        </Popup>
                    </Marker>
                    <Marker position={[postolat1, postolng1]}>
                        <Popup>
                        {postoname1} <br /> 
                        </Popup>
                    </Marker>
                    <Marker position={[postolat2, postolng2]}>
                        <Popup>
                        {postoname2} <br />
                        </Popup>
                    </Marker>
                    <Marker position={[postolat3, postolng3]}>
                        <Popup>
                        {postoname3}<br />
                        </Popup>
                    </Marker>
                    <Marker position={[postolat4, postolng4]}>
                        <Popup>
                        {postoname4} <br /> McDonald's
                        </Popup>
                    </Marker>
                    <Marker position={[postolat5,postolng5]}>
                        <Popup>
                        {postoname5} <br /> 
                        </Popup>
                    </Marker>
                    <Marker position={[postolat6,postolng6]}>
                        <Popup>
                        {postoname6} <br /> 
                        </Popup>
                    </Marker>
                    <Marker position={[postolat7,postolng7]}>
                        <Popup>
                        {postoname7}<br /> 
                        </Popup>
                    </Marker>
                    </MapContainer>
                </div>

                <div id="bars" className="table bars-list">
                    <div className="equipas">Bares</div>
                </div>

                <div id="games" className="table bars-list">
                    <div className="equipas">Jogos</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map(game => (
                                <tr key={game.id}>
                                    <td>{game.name}</td>
                                    <td>{game.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Postos;