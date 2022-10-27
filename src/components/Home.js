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
            <GeneralTable />
            <div className="separator"></div>
            <TeamsTable />
        </div>
    );
}

export default Home;