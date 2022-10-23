import React, { useEffect } from "react";
import './General_table.css';
import disableScroll from 'disable-scroll';

function General_table() {

    let persondata = [
        {name: "Destruidores", p1: 10},
        {name: "Xupamisto", p1: 20},
        {name: "Sugamisto", p1: 60},
        {name: "Hirokumata", p1: 10},
        {name: "Neect", p1: 50}
    ];
    //sort the array persondata by p1 and write the result in a new array
    let persondata2 = persondata.sort(function(a, b) {
        return b.p1 - a.p1;
    });
    console.log(persondata2);

    
    //function to read persondata and write it in the tbody with the id tabledata
    function writeTable(persondata2) {
        const tabledata = document.getElementById("tabledata");
        let tablehtml = "";
        for (let person of persondata) {
            tablehtml += `<tr><td>${person.name}</td><td>${person.p1}</td></tr>`;
        }
        tabledata.innerHTML = tablehtml;
    }
    useEffect(() => {
    writeTable(persondata);
    }, []);
    
    return (
        <div className="basetabelageral">
            <div className="equipa">Geral</div>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Equipa</th>
                        <th>Pontuação total</th>
                    </tr>
                </thead>
                <tbody id='tabledata'>
                    
                </tbody>
            </table>
        </div>
    );
}

export default General_table;