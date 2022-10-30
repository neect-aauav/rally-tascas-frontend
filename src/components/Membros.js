import React, { useEffect } from "react";
import Navbar from "./Navbar";
import './Membros.css';
import { createTable, fillTableHead, updateRow } from './Table.js';

import POINTS from '../images/point.png';
import RANKING from '../images/ranking.png';
import PUMPKIN from '../images/pumpkin.png';

const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://127.0.0.1:8000";

function Membros() {

    const getBars = async () => {
        if (localStorage.getItem("bars-data"))
            return JSON.parse(localStorage.getItem("bars-data"));
    
        const response = await fetch(API_URL+"/api/bars");
        const data = await response.json();
        localStorage.setItem("bars-data", JSON.stringify(data));
        console.log(data);
        return data;
    }
    
    function updateTable(table, rows) {  
        // old rows
        const oldRows = table.querySelectorAll("tr:not(:first-child)");
        rows.forEach((row, i) => updateRow(table, oldRows[i], [i+1, ...row]));      
    }

    getBars().then(bars => {

        // create table
        const tableWrapper = document.querySelector(".membros-container");
        const table = createTable(tableWrapper, "Membros");
        fillTableHead(table, [RANKING, "Nome", ...bars.map(bar => String(bar.id)).sort((a, b) => a-b), POINTS]);

        // loading
        const loading = document.createElement('div');
        loading.classList.add('loading');
        loading.innerHTML = "Loading...";
        table.appendChild(loading);

        // fill table from localstorage, if cashed
        const members = JSON.parse(localStorage.getItem("members-table"));
        if (members) {
            loading.remove();
            updateTable(table, members);
        }

        const updateMembersTable = () => {
            fetch(API_URL+"/api/scoreboard/members")
            .then(response => response.json())
            .then(rows => {
                localStorage.setItem("members-table", JSON.stringify(rows));

                // remove loading
                table.querySelector(".loading")?.remove();

                updateTable(table, rows);
            });
        };

        updateMembersTable();
        setInterval(() => updateMembersTable(), 1000);

        // pumpkin image
        const pumpkin = document.createElement('img');
        pumpkin.src = PUMPKIN;
        pumpkin.classList.add('pumpkin');
        document.querySelector(".equipa").appendChild(pumpkin);

        document.addEventListener("click", e => {
            const target = e.target;

            if (target.tagName === "TH") {
                if (!isNaN(target.innerText)) {
                    window.location.href = "postos";
                }
            }
        });
    });

    useEffect(() => {
        // select navbar tab
        const nav = document.querySelector(".Navbar");
        nav.querySelector(`a[href="${window.location.pathname}"]`)?.classList.add("selected-nav");
    }, []);

    return (
        <div className="Membros">
            <Navbar />
            <div className="textp-cabecalho membros-title">Classificação geral de todos os Membros</div>
            <div className="membros-container"></div>
        </div>
    )
}

export default Membros;