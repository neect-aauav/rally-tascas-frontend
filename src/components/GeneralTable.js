import { useEffect } from 'react';
import './Table.css';
import { createTable, fillTableHead } from './Table.js';

import RANKING from '../images/ranking.png';
import POINTS from '../images/point.png';
import EGG from '../images/egg-black.png';
import DRINKS from '../images/shot-glass-black.png';
import PUKE from '../images/puking.png';
import MEMBERS from '../images/members.png';
import PUMPKIN from '../images/pumpkin.png';

const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://127.0.0.1:8000";

function GeneralTable() {
    useEffect(() => {
        const home = document.querySelector("#general-table");

        const table = createTable(home, "Equipas");

        
        fillTableHead(table, [RANKING, "Nome", POINTS, DRINKS, EGG, PUKE, MEMBERS]);

        // loading
        const loading = document.createElement('div');
        loading.classList.add('loading');
        loading.innerHTML = "Loading...";
        table.appendChild(loading);

        setInterval(() => {
            getTeamsScoreboard().then(teams => {
                // remove loading
                table.querySelector(".loading")?.remove();  

                // update table
                updateTable(table, teams);
            });
        }, 1000);

        // pumpkin image
        const pumpkin = document.createElement('img');
        pumpkin.src = PUMPKIN;
        pumpkin.classList.add('pumpkin');
        document.querySelector(".equipa").appendChild(pumpkin);
    });

    return (
        <div id="general-table"></div>
    );
}

async function getTeamsScoreboard() {
    const response = await fetch(API_URL+"/api/scoreboard/teams");
    const data = await response.json();
    return data;
}

function updateTable(table, teams) {        
    // remove old rows
    table.querySelectorAll("tr:not(:first-child)").forEach(tr => tr?.remove());

    // column swap
    const columnSwap = (row, oldElem, newElem, value) => {
        if (oldElem) row.replaceChild(newElem, oldElem);
        else row.appendChild(newElem);

        if (value === true)
            newElem.innerHTML = "✔️";
        else if (value === false)
            newElem.innerHTML = "❌";
        else
        newElem.innerHTML = value; 
    }

    teams.forEach((team, i) => {
        const row = document.createElement('tr');
        table.appendChild(row);
        [i+1, ...team].forEach((column, j) => columnSwap(row, row.querySelector("td:nth-child("+(j+1)+")"), document.createElement('td'), column));
    });
}

export default GeneralTable;