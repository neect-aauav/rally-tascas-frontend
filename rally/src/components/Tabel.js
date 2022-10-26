import React,{useEffect} from "react";
import './Tabel.css';
function Tabel() {
    let individualdata = [
        {name: "LF", p1: 10, p2: 20, p3: 30, p4: 40, p5: 50, p6: 60, p7: 70, p8: 80,total:110},
        {name: "BL", p1: 20, p2: 20, p3: 30, p4: 40, p5: 50, p6: 60, p7: 70, p8: 80,total:120},
        {name: "ES", p1: 60, p2: 20, p3: 30, p4: 40, p5: 50, p6: 60, p7: 70, p8: 80,total:130},
        {name: "GT", p1: 10, p2: 20, p3: 30, p4: 40, p5: 50, p6: 60, p7: 70, p8: 80,total:140},
        {name: "JR", p1: 50, p2: 20, p3: 30, p4: 40, p5: 50, p6: 60, p7: 70, p8: 80,total:150}
    ];
    
    //sort the array individualdata by total and write the result in a new array
    let individualdata2 = individualdata.sort(function(a, b) {
        return b.total - a.total;
    });
    console.log(individualdata2);
    useEffect(() => {
        writeTable(individualdata2);
        }, []);
    
    //function to read individualdata and write it in the tbody with the id tabledata
    function writeTable(individualdata2) {
        const tabledata = document.getElementById("individualdata");
        let tablehtml = "";
        for (let person of individualdata) {
            tablehtml += `<tr><td>${person.name}</td><td>${person.p1}</td><td>${person.p2}</td><td>${person.p3}</td><td>${person.p4}</td><td>${person.p5}</td><td>${person.p6}</td><td>${person.p7}</td><td>${person.p8}</td><td>${person.total}</td></tr>`;
        }
        tabledata.innerHTML = tablehtml;
    }
    
    
    return (
        <div className="table basetabela">
            <div className="equipa">Destruidores</div>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>P1</th>
                        <th>P2</th>
                        <th>P3</th>
                        <th>P4</th>
                        <th>P5</th>
                        <th>P6</th>
                        <th>P7</th>
                        <th>P8</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="individualdata">
                    
                </tbody>
            </table>
        </div>
    );
}

export default Tabel;