import { useEffect } from 'react';
import './Table.css';
import { createTable, fillTableHead, updateRow } from './Table.js';

import POINTS from '../images/point.png';
import RANKING from '../images/ranking.png';

const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://127.0.0.1:8000";

function TeamsTable() {
   
    async function getNumberTeams() {
        if (localStorage.getItem("teams-size"))
            return JSON.parse(localStorage.getItem("teams-size"));

        const response = await fetch(API_URL+"/api/teams");
        const data = await response.json();
        localStorage.setItem("teams-size", JSON.stringify(data.length));
        return data;
    }

    async function getBars() {
        if  (localStorage.getItem("bars-data"))
            return JSON.parse(localStorage.getItem("bars-data"));

        const response = await fetch(API_URL+"/api/bars");
        const data = await response.json();
        localStorage.setItem("bars-data", JSON.stringify(data));
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

    useEffect(() => {
        getNumberTeams().then(size => {
            const tables = [], setupTables = [];
            for (let n = 0; n < size; n++) {
                setupTables.push(new Promise((resolve, reject) => {
                    const home = document.querySelector("#teams-tables");
                    
                    // add link anchor bottom before table
                    const anchor = document.createElement('div');
                    anchor.class = "achor";
                    home.appendChild(anchor);

                    const table = createTable(home, "Loading...");
                    tables.push(table);
    
                    getBars().then(bars => {
                        fillTableHead(table, [RANKING, "Nome", ...bars.map(bar => String(bar.id)).sort((a, b) => a-b), POINTS]);

                        // loading
                        const loading = document.createElement('div');
                        loading.classList.add('loading');
                        loading.innerHTML = "Loading...";
                        table.appendChild(loading);
                        
                        resolve(table);
                    });
                }));
            }
    
            // wait for all tables to be created
            Promise.all(setupTables).then(tables => {
                console.log(tables);


                const updateMembersRows = tables => {
                    fetch(API_URL+"/api/scoreboard/members/all")
                        .then(response => response.json())
                        .then(teams => {
                            // remove loading
                            tables.forEach(table => table.querySelector(".loading")?.remove());
    
                            teams.forEach((team, i) => updateTable(tables[i], team));
                        });
                };

                updateMembersRows(tables);
                setInterval(() => updateMembersRows(tables), 3000);
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


export default TeamsTable;