import { useEffect } from 'react';
import './Table.css';
import { createTable, fillTableHead, updateRow } from './Table.js';

import POINTS from '../images/point.png';
import RANKING from '../images/ranking.png';
import { tab } from '@testing-library/user-event/dist/tab.js';

const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://127.0.0.1:8000";

function TeamsTable() {
    async function getNumberTeams() {
        if (localStorage.getItem("teams-size"))
            return JSON.parse(localStorage.getItem("teams-size"));


        console.log(API_URL);
        const response = await fetch(API_URL+"/api/teams");
        const data = await response.json();
        localStorage.setItem("teams-size", JSON.stringify(data.length));
        return data;
    }

    async function getBars() {
        // if  (localStorage.getItem("bars-data"))
        //     return JSON.parse(localStorage.getItem("bars-data"));

        const response = await fetch(API_URL+"/api/bars");
        const data = await response.json();
        localStorage.setItem("bars-data", JSON.stringify(data));
        return data;
    }

    function updateTable(table, team) {
        // update anchor
        let teamName = team.team;
        if (!isNaN(teamName.charAt(0)))
            teamName = "a"+teamName;

        console.log(table);
        table.parentElement.previousSibling.id = teamName.replaceAll(" ", "-");
        
        // update table name
        table.parentElement.querySelector(".equipa").innerHTML = team.team;

        // old rows
        const oldRows = table.querySelectorAll("tr:not(:first-child)");
        team.members.forEach((member, i) => updateRow(table, oldRows[i], [i+1, ...member]));
    }

    useEffect(() => {
        const setupTables = [];
        setupTables.push(new Promise((resolve, reject) => {
            getNumberTeams().then(size => {
                getBars().then(bars => {
                    const tables = [];
                    for (let n = 0; n < size; n++) {
                        const home = document.querySelector("#teams-tables");
                        
                        // add link anchor bottom before table
                        const anchor = document.createElement('div');
                        anchor.class = "achor";
                        home.appendChild(anchor);

                        const table = createTable(home, "Loading...");
                        tables.push(table);
        
                        fillTableHead(table, [RANKING, "Nome", ...bars.map(bar => String(bar.id)).sort((a, b) => a-b), POINTS]);

                        // loading
                        const loading = document.createElement('div');
                        loading.classList.add('loading');
                        loading.innerHTML = "Loading...";
                        table.appendChild(loading);
                    }
                    resolve(tables);
                });
            });
        }));
        
        // wait for all tables to be created
        Promise.all(setupTables).then(tables => {
            tables = tables.flat();

            const updateMembersRows = tables => {
                fetch(API_URL+"/api/scoreboard/members/all")
                    .then(response => response.json())
                    .then(teams => {
                        // remove loading
                        tables.forEach(table => table.querySelector(".loading")?.remove());

                        console.log(teams);
                        teams.forEach((team, i) => updateTable(tables[i], team));
                    });
            };

            updateMembersRows(tables);
            // setInterval(() => updateMembersRows(tables), 8000);
        });
    });

    return (
        <div id="teams-tables"></div>
    );
}


export default TeamsTable;