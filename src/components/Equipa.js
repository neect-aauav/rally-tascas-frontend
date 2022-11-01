import './Equipa.css';
import Navbar from "./NavbarAdmin";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import SHOT_GLASS from '../images/shot-glass.png';
import PUKE from '../images/puke.png';
import EGG from '../images/egg.png';
import MEMBERS from '../images/members.png';
import GAME from '../images/game.png';
import EGG_CUP from '../images/egg-cup.png';
import CHECKPOINT from '../images/checkpoint.png';

const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://127.0.0.1:8000";

function Equipa() {
    const navigate = useNavigate();

    const drinkPointsValue = 10, pukePointsValue = -50, specialGamePointsValue = 100;
    const pukedPoints = {};
    
    // get team id from url
    const { id } = useParams();

    // fetch info on the bar
    fetch(API_URL + '/api/bars/' + localStorage.getItem('bar'))
        .then(response => response.json())
        .then(bar => {
            if (bar.name !== "ESSUA") document.querySelector("#special-game").style.display = "none";

            getTeam(id).then((data) => {
                console.log(data);
                const visited = data.bars.find(bar => bar.id == localStorage.getItem('bar'))?.visited;
                if (visited) {
                    // create warning top message
                    const warning = document.createElement('div');
                    warning.classList.add('warning-top-message');
                    warning.innerText = "Esta equipa já visitou este bar!";
                    document.querySelector('.Equipa').appendChild(warning);
                    warning.addEventListener("click", () => warning.remove());
                }

                // set title as team name
                document.querySelector('.team-name').innerText = data.name;

                // set initial points
                document.querySelector(".points-value").innerText = data.members.length * drinkPointsValue;

                // members wrapper
                const members = document.querySelector('.members-list');

                // list members
                data.members.forEach(member => {
                    const memberwrapper = document.createElement('div')
                    members.appendChild(memberwrapper)
                    memberwrapper.classList.add("memberwrapper")
                    // set attribute with member id
                    memberwrapper.setAttribute('data-member-id', member.id);

                    pukedPoints[member.id] = 0;

                    const h1 = document.createElement('div')
                    memberwrapper.appendChild(h1)
                    h1.classList.add('membernames')
                    h1.innerText=member.name
                    
                    const row = document.createElement('div')
                    memberwrapper.appendChild(row)
                    row.classList.add('memberinputs')

                    // drink image
                    const drink = document.createElement('img')
                    row.appendChild(drink)
                    drink.src = SHOT_GLASS;
                    drink.title = "Bebidas";

                    // dropdown with number of drinks
                    const dropdown = document.createElement('select')
                    row.appendChild(dropdown)
                    dropdown.classList.add('dropdown')
                    dropdown.id = "drinks_"+member.id
                    dropdown.setAttribute('data-drinks', 1);
                    for (let i = 0; i <= 10; i++) {
                        const option = document.createElement('option')
                        dropdown.appendChild(option)
                        option.value = i
                        option.innerText = i
                    }
                    dropdown.value = 1

                    // puke image
                    const puke = document.createElement('img')
                    row.appendChild(puke)
                    puke.src = PUKE;
                    puke.title = "Vomitou?";

                    // checkbox to check if puked
                    const checkbox = document.createElement('input')
                    row.appendChild(checkbox)
                    checkbox.type = "checkbox"
                    checkbox.id = "puked_"+member.id
                    checkbox.classList.add('checkbox-puked')
                    checkbox.value = false
                    checkbox.addEventListener('input', () => {
                        const memberPointsView = document.querySelector(`.memberwrapper[data-member-id="${member.id}"] .memberpoints-view`);
                        if (checkbox.checked) {
                            pukedPoints[member.id] = pukePointsValue;
                            addPoints(memberPointsView, pukePointsValue);
                            addPoints(document.querySelector('.points-value'), pukePointsValue);
                        }
                        else {
                            pukedPoints[member.id] = 0;
                            removePoints(memberPointsView, pukePointsValue);
                            removePoints(document.querySelector('.points-value'), pukePointsValue);
                        }
                    });

                    // member points view
                    const points = document.createElement('div')
                    memberwrapper.appendChild(points)
                    points.classList.add('memberpoints-view')
                    points.innerText = drinkPointsValue;
                });

                // egg wrapper
                const egg = document.querySelector('.egg .section-title');

                // checkbox to check if team has egg still
                if (data.has_egg) {
                    document.querySelector('.egg > .section-title').style.marginBottom = "unset";
                    const checkbox = document.createElement('input')
                    egg.appendChild(checkbox)
                    checkbox.type = "checkbox"
                    checkbox.id = "egg"
                    checkbox.checked = data.has_egg
                }
                else {
                    // team lost egg
                    const h1 = document.createElement('div')
                    egg.appendChild(h1)
                    h1.classList.add('egglost')
                    h1.innerText="Já o perdeu!"
                }

                // click event listener to send
                document.querySelector('#send').onclick = () => {
                    // get total points
                    const points = parseInt(document.querySelector('.points-value').innerText);

                    // get drinks from members
                    const members = document.querySelectorAll('.memberwrapper');
                    let members_values = [];
                    let puke_counter = 0, drinks_counter = 0;
                    members.forEach(member => {
                        const member_id = parseInt(member.getAttribute('data-member-id'));
                        const drinks = parseInt(member.querySelector('.dropdown').value);
                        const gamePoints = document.querySelector('#game-checkbox').checked ? bar.game.points : 0;
                        const specialGamePoints = document.querySelector('#special-game-checkbox') && document.querySelector('#special-game-checkbox').checked ? specialGamePointsValue : 0;
                        members_values.push({
                            "id": member_id,
                            "points": (drinks * drinkPointsValue) + parseFloat(gamePoints/members.length) + pukedPoints[member_id] + parseFloat(specialGamePoints/members.length),
                            "drinks": drinks
                        });
                        
                        drinks_counter += drinks;

                        const puked = member.querySelector('.checkbox-puked').checked;
                        if (puked) puke_counter++;
                    });

                    // get egg
                    const egg = document.querySelector('#egg')?.checked;

                    const body = {
                        "team_id": id,
                        "bar_id": localStorage.getItem('bar'),
                        "game_completed": document.querySelector("#game-checkbox").checked,
                        "points": points,
                        "drinks": drinks_counter,
                        "puked": puke_counter,
                        "has_egg": egg ? true : false,
                        "members": members_values
                    };

                    // send data
                    // random between 1 and 60 seconds 
                    // const random = (Math.random() * 120) + 2.34;
                    // document.querySelector(".team-name").innerText = random+"segs";
                    // setTimeout(() => {
                        fetch(API_URL+"/api/teamplay", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Token ' + localStorage.getItem('token')
                            },
                            body: JSON.stringify(body)
                        }).then((response) => {
                            if (response.status === 200) {
                                // send special game if checked
                                if (document.querySelector('#special-game-checkbox') && document.querySelector('#special-game-checkbox').checked) {
                                    fetch(API_URL+"/api/teams/"+id, {
                                        method: 'PATCH',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Token ' + localStorage.getItem('token')
                                        },
                                        body: JSON.stringify({
                                            "won_special_game": true
                                        })
                                    }).then((response) => {
                                        if (response.status === 200) {
                                            navigate("/admin/qrcode");
                                        }
                                        else {
                                            alert("Ocorreu um erro ao enviar o jogo especial!");
                                        }
                                    });
                                }

                                navigate("/admin/qrcode");
                            }
                            else {
                                alert("Ocorreu um erro. Por favor tenta novamente.");
                            }
                        });
                        
                    // }, random * 1000);
                }
        });

        // add event listener to inputs
        document.addEventListener('input', e => {
            const target = e.target;
            let memberPointsView;

            // increase drink of member
            let dropdown;
            if ((dropdown = target.closest(".memberwrapper .dropdown"))) {
                const n_drinks = parseInt(dropdown.value);
                const difference = (n_drinks - Number(dropdown.getAttribute('data-drinks'))) * drinkPointsValue;
                addPoints(document.querySelector('.points-value'), difference);

                // update current n_drinks
                dropdown.setAttribute('data-drinks', n_drinks);

                // update member points view
                memberPointsView = document.querySelector(`.memberwrapper[data-member-id="${dropdown.id.split('_')[1]}"] .memberpoints-view`);
                addPoints(memberPointsView, difference);
            }

            // check if completed game
            let checkbox;
            if ((checkbox = target.closest("#game-checkbox"))) {
                if (checkbox.checked) {
                    addPoints(document.querySelector('.points-value'), bar.game.points);

                    // update member points view
                    document.querySelectorAll('.memberwrapper').forEach(member => {
                        memberPointsView = member.querySelector(`.memberpoints-view`);
                        console.log(memberPointsView);
                        addPoints(memberPointsView, bar.game.points / document.querySelectorAll('.memberwrapper').length);
                    });
                }
                else {
                    removePoints(document.querySelector('.points-value'), bar.game.points);

                    // update member points view
                    document.querySelectorAll('.memberwrapper').forEach(member => {
                        memberPointsView = member.querySelector(`.memberpoints-view`);
                        removePoints(memberPointsView, bar.game.points / document.querySelectorAll('.memberwrapper').length);
                    });
                }
            }

            // check if team drank egg
            if ((checkbox = target.closest("#special-game-checkbox"))) {
                if (checkbox.checked) {
                    addPoints(document.querySelector('.points-value'), specialGamePointsValue);
                    
                    // update member points view
                    document.querySelectorAll('.memberwrapper').forEach(member => {
                        memberPointsView = member.querySelector(`.memberpoints-view`);
                        addPoints(memberPointsView, specialGamePointsValue / document.querySelectorAll('.memberwrapper').length);
                    });
                }
                else {
                    removePoints(document.querySelector('.points-value'), specialGamePointsValue);
                    
                    // update member points view
                    document.querySelectorAll('.memberwrapper').forEach(member => {
                        memberPointsView = member.querySelector(`.memberpoints-view`);
                        removePoints(memberPointsView, specialGamePointsValue / document.querySelectorAll('.memberwrapper').length);
                    });
                }
            }

        });
    });

    return(
        <div className='Equipa'>
            <Navbar />
            <div className="team-container">
                <div className="wrapper" id="equipa">
                    <div className="wrapper" id="total-points">
                        <img src={CHECKPOINT}></img>
                        <div className="team-name"></div>
                        <div className="points">
                            <div className="points-value"></div>
                            <div className="points-text">Pontos</div>
                        </div>
                    </div>
                    <div className="section egg">
                        <div className="section-title"><img src={EGG}></img>Ovo</div>
                        
                    </div>
                    <div className="section-title"><img src={MEMBERS}></img>Membros</div>
                    <div className="section members">
                        
                        <div className="members-list"></div>
                    </div>
                    <div className="section game">
                        <div className="section-title"><img src={GAME}></img>Jogo<input id="game-checkbox" type="checkbox"></input></div>
                    </div>
                    
                    {/* game of ESSUA */}
                    <div id="special-game" className="section game">
                        <div className="section-title"><img src={EGG_CUP}></img>Bebeu o Ovo<input id="special-game-checkbox" type="checkbox"></input></div>
                    </div>

                    <div className="button" id="send">Send</div>
                </div>
            </div>
        </div>
 
    )
}


async function getTeam(id) {
    const response = await fetch(API_URL+"/api/teams/"+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        }
    });
    const data = await response.json();
    return data;
}

const addPoints = (scoreboard, points) => {
    const currentPoints = parseInt(scoreboard.innerText);
    scoreboard.innerText = currentPoints + points;
}

const removePoints = (scoreboard, points) => {
    const currentPoints = parseInt(scoreboard.innerText);
    scoreboard.innerText = currentPoints - points;
}

export default Equipa;