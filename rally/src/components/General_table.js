import React, { useEffect } from "react";
import './General_table.css';
import disableScroll from 'disable-scroll';

function General_table() {
    
    //function to read persondata and write it in the tbody with the id tabledata
    function writeTable(persondata) {
        const tabledata = document.getElementById("tabledata");
        let tablehtml = "";
        for (let person of persondata) {
            tablehtml += `<tr><td>${person.name}</td><td>${person.p1}</td></tr>`;
        }
        tabledata.innerHTML = tablehtml;
    }

    // fetch teams from api
    getTeams().then((data) => {
        const teams = data.map(team => ({
            "name": team.name,
            "p1": team.points
        })).sort((a, b) => b.p1 - a.p1);

        writeTable(teams);
    });
    
    return (
        <div className="table basetabelageral">
            <div className="equipa">Geral</div>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Equipa</th>
                        <th>Pontuação total</th>
                    </tr>
                </thead>
                <tbody id='tabledata'>
                    
                </tbody>
            </table>
        </div>
    );
}

async function getTeams() {
    const response = await fetch("http://localhost:8000/api/teams");
    const data = await response.json();
    return data;
}

export default General_table;