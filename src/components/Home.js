import React from "react";
import './Home.css';
import './Table.css';
import Navbar from "./Navbar";
import Table from "./Table";
import General_table from "./General_table";

function Home() {
    console.log("Home");

    return (
        <div className="Home">
            <Navbar />
            {/* <General_table /> */}
            <Table />
        </div>
    );
}

export default Home;