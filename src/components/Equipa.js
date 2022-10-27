import './Equipa.css';
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

import SHOT_GLASS from '../images/shot-glass.png';
import PUKE from '../images/puke.png';
import EGG from '../images/egg.png';
import MEMBERS from '../images/members.png';
import GAME from '../images/game.png';

const API_URL = process.env.API_URL ? process.env.API_URL : "http://127.0.0.1:8000";
    
function Equipa() {
    const drinkPointsValue = 10;

    // get team id from url
    const { id } = useParams();

    getTeam(id).then((data) => {
        console.log(data);

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
        });

        // game wrapper
        const game = document.querySelector('.game');

        // dropdown with number of points in the game
        const dropdown = document.createElement('select')
        game.appendChild(dropdown)
        dropdown.classList.add('dropdown')
        dropdown.id = "points"
        dropdown.setAttribute('data-points', 0);
        for (let i = 0; i <= 100; i+=10) {
            const option = document.createElement('option')
            dropdown.appendChild(option)
            option.value = i
            option.innerText = i
        }
        dropdown.value = 0

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
            h1.innerText="Equipa já perdeu o ovo!"
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
                members_values.push({
                    "id": member_id,
                    "points": (drinks * drinkPointsValue) + parseFloat(document.querySelector(".game .dropdown").value/members.length),
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
                "game_completed": parseInt(document.querySelector(".game > .dropdown").value) > 0,
                "points": points,
                "drinks": drinks_counter,
                "puked": puke_counter,
                "has_egg": egg ? true : false,
                "members": members_values
            };

            // send data
            fetch(API_URL+"/api/teamplay", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token')
                },
                body: JSON.stringify(body)
            }).then((response) => console.log(response));
        }

    });

    // add event listener to inputs
    document.addEventListener('input', e => {
        const target = e.target;

        // increase drink of member
        let dropdown;
        if ((dropdown = target.closest(".memberwrapper .dropdown"))) {
            const n_drinks = parseInt(dropdown.value);
            const difference = (n_drinks - Number(dropdown.getAttribute('data-drinks'))) * drinkPointsValue;
            document.querySelector(".points-value").innerText = parseInt(document.querySelector(".points-value").innerText) + difference;

            // update current n_drinks
            dropdown.setAttribute('data-drinks', n_drinks);
        }

        // increase points from game
        if ((dropdown = target.closest(".game .dropdown"))) {
            const points = parseInt(dropdown.value);
            const difference = points - Number(dropdown.getAttribute('data-points'));
            document.querySelector(".points-value").innerText = parseInt(document.querySelector(".points-value").innerText) + difference;

            // update current points
            dropdown.setAttribute('data-points', points);
        }
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
                <div className="section egg">
                    <div className="section-title"><img src={EGG}></img>Ovo</div>
                    
                </div>
                <div className="section-title"><img src={MEMBERS}></img>Membros</div>
                <div className="section members">
                    
                    <div className="members-list"></div>
                </div>
                <div className="section game">
                    <div className="section-title"><img src={GAME}></img>Pontos Jogo</div>
                </div>

                <div className="button" id="send">Send</div>
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

export default Equipa;