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

import NAME from '../images/name.png';
import COSTUME from '../images/costume.png';
import SPECIAL_GAME from '../images/special-game.png';

const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://127.0.0.1:8000";

function GeneralTable() {

    async function getTeamsScoreboard() {
        const response = await fetch(API_URL+"/api/scoreboard/teams");
        const data = await response.json();
        console.log(data);
        localStorage.setItem("general-table", JSON.stringify(data["scoreboard"]));
        localStorage.setItem("special-prizes", JSON.stringify(data["special-prizes"]));
        return data;
    }
    
    function updateTable(table, teams, specialPrizes) {        
        // old rows
        const oldRows = table.querySelectorAll("tr:not(:first-child)");
        teams.forEach((team, i) => {
            const row = updateRow(table, oldRows[i], [i+1, ...team]);

            const nameTd = row.querySelector("td:nth-child(2)");
            nameTd.querySelector(".special-game")?.remove();
            if (specialPrizes && specialPrizes[i] && specialPrizes[i]["won_special_game"]) {
                // add special game
                const specialGameDiv = document.createElement('div');
                specialGameDiv.classList.add('special-game');
                nameTd.appendChild(specialGameDiv);
                const img = document.createElement('img');
                img.src = SPECIAL_GAME;
                specialGameDiv.appendChild(img);
            }
        });
    }

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
        const specialPrizes = JSON.parse(localStorage.getItem("special-prizes"));
        if (teams) {
            updateTable(table, teams, specialPrizes);
            loading.remove();
        }

        const updateGeneralTable = () => {
            getTeamsScoreboard().then(teams => {
                // remove loading
                table.querySelector(".loading")?.remove();  

                // update table
                updateTable(table, teams["scoreboard"], teams["special-prizes"]);

                const bestName = teams["special-prizes"].find(team => team["best_name"])?.name;
                const bestCostume = teams["special-prizes"].find(team => team["best_team_costume"])?.name;
                // add info on best name and costume to the end of the table
                const bestTeams = document.querySelector("#best-teams");
                if (!bestTeams) {
                    const best = document.createElement("div");
                    table.parentElement.appendChild(best);
                    best.style.marginTop = "20px";
                    best.id = "best-teams";
                    const bestTeams = [bestName, bestCostume];
                    const images = [NAME, COSTUME];
                    bestTeams.forEach((team, i) => {
                        const bestNameRow = document.createElement('div');
                        bestNameRow.classList.add('special-prize');
                        best.appendChild(bestNameRow);
                        const bestNameImg = document.createElement('img');
                        bestNameImg.src = images[i];
                        bestNameRow.appendChild(bestNameImg);
                        const bestNameText = document.createElement('div');
                        if (team)
                            bestNameText.innerHTML = team;
                        else
                            bestNameText.innerHTML = "Por definir...";
                        bestNameRow.appendChild(bestNameText);
                    });
                }
                else {
                    bestTeams.querySelector(".special-prize div:nth-child(1)").innerHTML = bestName;
                    bestTeams.querySelector(".special-prize div:nth-child(2)").innerHTML = bestCostume;
                }
            });
        }

        updateGeneralTable();
        setInterval(() => updateGeneralTable(), 1000);

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


export default GeneralTable;