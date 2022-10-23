import React from "react";
import './Home.css';
import Navbar from "./Navbar";
import Tabel from "./Tabel";
import General_table from "./General_table";

function Home() {

    

    return (
        <div className="Home">
            <Navbar />
            <Tabel />
            <General_table />
        </div>
    );
}

export default Home;