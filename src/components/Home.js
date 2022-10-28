import React from "react";
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

function Home() {
    return (
        <div className="Home">
            <div className="home-title">TRICK OR DRINK</div>
            <Navbar />
            <div class="home-container">
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
                </div>
            </div>
        </div>
    );
}

export default Home;