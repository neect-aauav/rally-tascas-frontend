import React from "react";
import './Home.css';
import './Table.css';
import Navbar from "./Navbar";
import GeneralTable from "./GeneralTable";
import TeamsTable from "./TeamsTable";

function Home() {
    return (
        <div className="Home">
            <Navbar />
            <div class="home-container">
                <GeneralTable />
                <div className="separator"></div>
                <TeamsTable />
            </div>
        </div>
    );
}

export default Home;