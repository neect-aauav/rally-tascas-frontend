import { useEffect } from 'react';
import './Table.css';
import { createTable, fillTableHead, updateRow } from './Table.js';

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
                    
                    // add link anchor bottom before table
                    const anchor = document.createElement('div');
                    anchor.class = "achor";
                    home.appendChild(anchor);

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
    
                            // fill tables from localstorage, if cashed
                            const teams = JSON.parse(localStorage.getItem("teams-tables"));
                            if (teams) {
                                loading.remove();
                                teams.forEach((team, i) => updateTable(tables[i], team));
                            }

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
                            localStorage.setItem("teams-tables", JSON.stringify(teams));
                            
                            // remove loading
                            tables.forEach(table => table.querySelector(".loading")?.remove());
    
                            teams.forEach((team, i) => updateTable(tables[i], team));
                        });
                }, 3000);
            });

            document.addEventListener("click", e => {
                const target = e.target;

                if (target.tagName === "TH") {
                    if (!isNaN(target.innerText)) {
                        window.location.href = "postos";
                    }
                }
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
    // update anchor
    table.parentElement.previousSibling.id = team.team.replaceAll(" ", "-");
    
    // update table name
    table.parentElement.querySelector(".equipa").innerHTML = team.team;

    // old rows
    const oldRows = table.querySelectorAll("tr:not(:first-child)");
    team.members.forEach((member, i) => updateRow(table, oldRows[i], [i+1, ...member]));
}

export default TeamsTable;