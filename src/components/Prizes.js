import React, { useEffect,useState } from "react";
import './Prizes.css';
import './Table.css';
import theme_logo from'../images/theme_logo.png';

import 'swiped-events';

const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://127.0.0.1:8000";

function Prizes() {
    const [place1,setplace1] = useState(0);
    const [place2,setplace2] = useState(0);
    const [place3,setplace3] = useState(0);
    const [prize1,setprize1] = useState(0);
    const [prize2,setprize2] = useState(0);
    const [prize3,setprize3] = useState(0);
  
    async function getPrizes() {
      const response = await fetch(API_URL+"/api/prizes");
      const data = await response.json();
      console.log(data);
      setprize1(data[0].name);
      setprize2(data[1].name);
      setprize3(data[2].name);  
      setplace1(data[0].id);
      setplace2(data[1].id);
      setplace3(data[2].id);
      return data;
    }
  
  getPrizes().then(bars =>  {

    // list bars
    const barsWrapper = document.querySelector(".bars-list");
    const barsTable = document.createElement("table");
    barsWrapper.appendChild(barsTable);
});
  return (
    <div className="tabelaequipa">
      <div id="bars" className="table bars-list">
          <div className="equipas">
            <img src={theme_logo} className="theme_logo"/>
             Lista de prémios
          </div>
            {/* create table */}
            <table>
                <tr>
                    <th>Lugar</th>
                    <th>Prémio</th>
                </tr>
                <tr>
                    <td>{place1}</td>
                    <td>{prize1}</td>
                </tr>
                <tr>
                    <td>{place2}</td>
                    <td>{prize2}</td>
                </tr>
                <tr>
                    <td>{place3}</td>
                    <td>{prize3}</td>
                </tr>
            </table>
      </div>
    </div>
  );
}

export default Prizes;