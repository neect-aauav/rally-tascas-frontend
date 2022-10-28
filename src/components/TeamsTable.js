import { useEffect } from 'react';
import './Table.css';
import { createTable, fillTableHead } from './Table.js';

import POINTS from '../images/point.png';
import RANKING from '../images/ranking.png';

const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://127.0.0.1:8000";

function TeamsTable() {
    
    useEffect(() => {
        getTeams().then(teams => {
            const tables = [];
            const setupTables = teams.map(team => {
                return(new Promise((resolve, reject) => {
                    const home = document.querySelector("#teams-tables");
                    const table = createTable(home, "Loading...");
                    tables.push(table);
    
                    fetch(API_URL+"/api/bars")
                        .then(response => response.json())
                        .then(bars => {
                            fillTableHead(table, [RANKING, "Nome", ...bars.map(bar => String(bar.id)).sort((a, b) => a-b), POINTS]);
    
                            // loading
                            const loading = document.createElement('div');
                            loading.classList.add('loading');
                            loading.innerHTML = "Loading...";
                            table.appendChild(loading);
    
                            resolve(table);
                        });
                }));
            });
    
            // wait for all tables to be created
            Promise.all(setupTables).then(tables => {
                // continously update members rows
                setInterval(() => {
                    fetch(API_URL+"/api/scoreboard/members/all")
                        .then(response => response.json())
                        .then(teams => {
                            // remove loading
                            tables.forEach(table => table.querySelector(".loading")?.remove());
    
                            teams.forEach((team, i) => {
                                updateTable(tables[i], team);
                            });
                        });
                }, 1000);
            });
        });
    });

    return (
        <div id="teams-tables"></div>
    );
}

async function getTeams() {
    const response = await fetch(API_URL+"/api/teams");
    const data = await response.json();
    return data;
}

function updateTable(table, team) {        
    // remove old rows
    table.querySelectorAll("tr:not(:first-child)").forEach(tr => tr?.remove());

    // column swap
    const columnSwap = (row, oldElem, newElem, value) => {
        if (oldElem) row.replaceChild(newElem, oldElem);
        else row.appendChild(newElem);
        newElem.innerHTML = value; 
    }

    // update table name
    table.parentElement.querySelector(".equipa").innerHTML = team.team;

    team.members.forEach((member, i) => {
        // fill row with member data
        const row = document.createElement('tr');
        table.appendChild(row);
        [i+1, ...member].forEach((value, j) => {
            columnSwap(row, row.querySelector("td:nth-child("+(j+1)+")"), document.createElement('td'), value);
        });
    });
}

export default TeamsTable;