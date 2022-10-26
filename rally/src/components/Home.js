import React from "react";
import './Home.css';
import './Tables.css';
import Navbar from "./Navbar";
import Tabel from "./Tabel";
import General_table from "./General_table";

function Home() {
    console.log("Home");

    return (
        <div className="Home">
            <Navbar />
            <General_table />
            <Tabel />
        </div>
    );
}

export default Home;