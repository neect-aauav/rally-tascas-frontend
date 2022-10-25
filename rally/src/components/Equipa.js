import React,{useState,useEffect} from "react";
import './Equipa.css';
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

function Equipa() {
    // get team id from url
    const { id } = useParams();

    getTeam(id).then((data) => {
        console.log(data);

        // set title as team name
        document.querySelector('.team-name').innerText = data.name;

        // set initial points
        document.querySelector(".points-value").innerText = data.members.length * 10;

        // members wrapper
        const members = document.querySelector('.members-list');

        // list members
        data.members.forEach(member => {
            const memberwrapper = document.createElement('div')
            members.appendChild(memberwrapper)
            memberwrapper.classList.add("memberwrapper")
            const h1 = document.createElement('div')
            memberwrapper.appendChild(h1)
            h1.classList.add('membernames')
            h1.innerText=member.name
            
            // dropdown with number of drinks
            const dropdown = document.createElement('select')
            memberwrapper.appendChild(dropdown)
            dropdown.classList.add('dropdown')
            dropdown.id = "drinks_"+member.id
            for (let i = 0; i <= 10; i++) {
                const option = document.createElement('option')
                dropdown.appendChild(option)
                option.value = i
                option.innerText = i
            }
            dropdown.value = 1
        });

        // game wrapper
        const game = document.querySelector('.game');

        // dropdown with number of points in the game
        const dropdown = document.createElement('select')
        game.appendChild(dropdown)
        dropdown.classList.add('dropdown')
        dropdown.id = "points"
        for (let i = 0; i <= 100; i+=10) {
            const option = document.createElement('option')
            dropdown.appendChild(option)
            option.value = i
            option.innerText = i
        }
        dropdown.value = 0
    });

    return(
        <div className="container">
            <Navbar />
            <div className="wrapper" id="equipa">
                <div className="wrapper" id="total-points">
                    <div className="team-name"></div>
                    <div className="points">
                        <div className="points-value"></div>
                        <div className="points-text">Pontos</div>
                    </div>
                </div>
                <div className="section members">
                    <div className="section-title">Membros</div>
                    <div className="members-list"></div>
                </div>
                <div className="section game">
                    <div className="section-title">Pontos ganhos no jogo</div>
                </div>

                <div className="button">Send</div>
            </div>
        </div>
    )
}


async function getTeam(id) {
    const response = await fetch("http://localhost:8000/api/teams/"+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        }
    });
    const data = await response.json();
    return data;
}

export default Equipa;