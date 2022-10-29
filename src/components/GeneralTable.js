import { useEffect } from 'react';
import './Table.css';
import './GeneralTable.css';
import { createTable, fillTableHead, updateRow } from './Table.js';

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

        // fill table from localstorage, if cashed
        const teams = JSON.parse(localStorage.getItem("general-table"));
        if (teams) {
            updateTable(table, teams);
            loading.remove();
        }

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
    localStorage.setItem("general-table", JSON.stringify(data));
    return data;
}

function updateTable(table, teams) {        
    // old rows
    const oldRows = table.querySelectorAll("tr:not(:first-child)");
    teams.forEach((team, i) => updateRow(table, oldRows[i], [i+1, ...team]));
}

export default GeneralTable;