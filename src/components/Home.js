import React, { useEffect } from "react";
import './Home.css';
import './Table.css';
import Navbar from "./Navbar";
import GeneralTable from "./GeneralTable";
import TeamsTable from "./TeamsTable";

import RANKING from '../images/ranking.png';
import POINTS from '../images/point.png';
import EGG from '../images/egg-black.png';
import DRINKS from '../images/shot-glass-black.png';
import PUKE from '../images/puking.png';
import MEMBERS from '../images/members.png';
import NAME from '../images/name.png';
import COSTUME from '../images/costume.png';
import SPECIAL_GAME from '../images/special-game.png';

import 'swiped-events';

function Home() {

    useEffect(() => {
        // select navbar tab
        const nav = document.querySelector(".Navbar");
        nav.querySelector(`a[href="${window.location.pathname}"]`)?.classList.add("selected-nav");
      
        // swiped events
        document.addEventListener('swiped-right', () => window.location.href = "/premios");
        document.addEventListener('swiped-left', () => window.location.href = "/membros"); 
      }, []);

    return (
        <div className="Home">
            <div className="home-title">TRICK OR DRINK</div>
            <Navbar />
            <div className="home-container">
                <GeneralTable />
                <div className="separator"></div>
                <TeamsTable />
                <div className="separator"></div>
                {/* table key */}
                <div className="table-key">
                    <h1>Legenda:</h1>
                    <div className="table-key-item">
                        <img src={RANKING} alt="ranking" />
                        <div>Ranking</div>
                    </div> 
                    <div className="table-key-item">
                        <img src={POINTS} alt="points" />
                        <div>Pontos</div>
                    </div>
                    <div className="table-key-item">
                        <img src={EGG} alt="egg" />
                        <div>Ovo</div>
                    </div>
                    <div className="table-key-item">
                        <img src={DRINKS} alt="drinks" />
                        <div>Bebidas</div>
                    </div>
                    <div className="table-key-item">
                        <img src={PUKE} alt="puke" />
                        <div>Vómitos</div>
                    </div>
                    <div className="table-key-item">
                        <img src={MEMBERS} alt="members" />
                        <div>Membros</div>
                    </div>
                    <div className="table-key-item special-game-item">
                        <img src={SPECIAL_GAME} alt="special game" />
                        <div>Cumpriu o Desafio Final</div>
                    </div>
                    <div className="table-key-item prize-item">
                        <img src={NAME} alt="name" />
                        <div>Nome mais original</div>
                    </div>
                    <div className="table-key-item prize-item">
                        <img src={COSTUME} alt="costume" />
                        <div>Disfarce coletivo mais original</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;