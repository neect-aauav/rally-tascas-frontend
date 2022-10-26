import React,{useEffect, useState} from "react";
import './Tabel.css';
function Tabel() {

    function createTable(wrapper, team) {
        const tablewrapper = document.createElement('div');
        wrapper.appendChild(tablewrapper);
        tablewrapper.classList.add('table','basetabela')
        const title = document.createElement('div');
        title.classList.add('equipa');
        title.innerHTML = team.name;
        tablewrapper.appendChild(title);
        const table = document.createElement('table');
        table.classList.add('styled-table');
        tablewrapper.appendChild(table);
        const thead = document.createElement('thead');
        table.appendChild(thead);
        return table;
    }

    function fillTableHead(table) {
        fetch("http://localhost:8000/api/bars")
            .then(response => response.json())
            .then(bars => {
                const trhead = document.createElement('tr');
                table.querySelector("thead").appendChild(trhead);
                bars.forEach((_, i) => {
                    const th = document.createElement('th');
                    trhead.appendChild(th);
                    th.innerHTML = "P"+(i+1);
                }); 
            });
    }


    function updateTable(table, team) {
        team.members.forEach((member, i) => {
            fetch("http://localhost:8000/api/members/"+member.id)
                .then(response => response.json())
                .then(member_data => {
                    let tr;
                    // if tr already exists
                    if ((tr = table.querySelector('tr:nth-child('+(i+2)+')'))) {
                        member_data.bars.forEach((bar, j) => {
                            const old = tr.querySelector('td:nth-child('+(j+1)+')');
                            const td = document.createElement('td');
                            if (old) tr.replaceChild(td, old);
                            else tr.appendChild(td);
                            td.innerHTML = bar.points;
                        });
                    }
                    else {
                        tr = document.createElement('tr');
                        table.appendChild(tr);
                        member_data.bars.forEach((bar, j) => {
                            const old = tr.querySelector('td:nth-child('+(j+1)+')');
                            const td = document.createElement('td');
                            if (old) tr.replaceChild(td, old);
                            else tr.appendChild(td);
                            td.innerHTML = bar.points;
                        });
                    }
                });
        })
    }

    getTeams().then(teams => {
        teams.forEach(team => {
            const home = document.querySelector(".Home");
            const table = createTable(home, team);
            fillTableHead(table);

            // continously update members rows
            setInterval(() => {
                updateTable(table, team);
            }, 1000);
        });
    });

    function makeTables(data) {
        if (data) {
            const home = document.querySelector('.Home')
            data.forEach(team => {
                // create table
                const tablewrapper = document.createElement('div');
                home.appendChild(tablewrapper);
                tablewrapper.classList.add('table','basetabela')
                const title = document.createElement('div');
                title.classList.add('equipa');
                title.innerHTML = team.name;
                tablewrapper.appendChild(title);
                const table = document.createElement('table');
                table.classList.add('styled-table');
                tablewrapper.appendChild(table);
                const thead = document.createElement('thead');
                table.appendChild(thead);
                const trhead = document.createElement('tr');
                thead.appendChild(trhead);
                const thname = document.createElement('th');
                thname.innerHTML = 'Nome';     
                trhead.appendChild(thname);
                team.members.forEach((member, i) => {
                    fetch("http://localhost:8000/api/members/"+member.id)
                        .then(response => response.json())
                        .then(member_data => {
                            //creating headers of the table with bares info and total points
                            if (i == 0) {
                                member_data.bars.forEach((_,i) => {
                                    console.log(i);
                                    const thbar = document.createElement('th');
                                    thbar.innerHTML = 'P'+i;
                                    trhead.appendChild(thbar);
                                    
                                }); 
                                const thtotal = document.createElement('th');
                                thtotal.innerHTML = 'Total';
                                trhead.appendChild(thtotal);
                            } 
    
                            //create row for each member
                            const tr = document.createElement('tr');
                            table.appendChild(tr);
                            const tdname = document.createElement('td');
                            tdname.innerHTML = member_data.name;
                            tr.appendChild(tdname);
                            member_data.bars.forEach((bar, i) => {
                                const tdbar = document.createElement('td');
                                tdbar.innerHTML = bar.points;
                                tr.appendChild(tdbar);
                            });
                            const tdtotal = document.createElement('td');
                            tdtotal.innerHTML = member_data.points;
                            tr.appendChild(tdtotal);
                        });
                });
            });
        }
    }

    // getTeams().then((team_data) => {
    //     const home = document.querySelector('.Home')
    //     team_data.forEach(team => {
    //         // create table
    //         const tablewrapper = document.createElement('div');
    //         home.appendChild(tablewrapper);
    //         tablewrapper.classList.add('table','basetabela')
    //         const title = document.createElement('div');
    //         title.classList.add('equipa');
    //         title.innerHTML = team.name;
    //         tablewrapper.appendChild(title);
    //         const table = document.createElement('table');
    //         table.classList.add('styled-table');
    //         tablewrapper.appendChild(table);
    //         const thead = document.createElement('thead');
    //         table.appendChild(thead);
    //         const trhead = document.createElement('tr');
    //         thead.appendChild(trhead);
    //         const thname = document.createElement('th');
    //         thname.innerHTML = 'Nome';     
    //         trhead.appendChild(thname);
    //         team.members.forEach((member, i) => {
    //             fetch("http://localhost:8000/api/members/"+member.id)
    //                 .then(response => response.json())
    //                 .then(member_data => {
    //                     //creating headers of the table with bares info and total points
    //                     if (i == 0) {
    //                         member_data.bars.forEach((_,i) => {
    //                             console.log(i);
    //                             const thbar = document.createElement('th');
    //                             thbar.innerHTML = 'P'+i;
    //                             trhead.appendChild(thbar);
                                
    //                         }); 
    //                         const thtotal = document.createElement('th');
    //                         thtotal.innerHTML = 'Total';
    //                         trhead.appendChild(thtotal);
    //                     } 

    //                     //create row for each member
    //                     const tr = document.createElement('tr');
    //                     table.appendChild(tr);
    //                     const tdname = document.createElement('td');
    //                     tdname.innerHTML = member_data.name;
    //                     tr.appendChild(tdname);
    //                     member_data.bars.forEach((bar, i) => {
    //                         const tdbar = document.createElement('td');
    //                         tdbar.innerHTML = bar.points;
    //                         tr.appendChild(tdbar);
    //                     });
    //                     const tdtotal = document.createElement('td');
    //                     tdtotal.innerHTML = member_data.points;
    //                     tr.appendChild(tdtotal);
    //                 });
    //         });
    //     });
    // });
    

              
    return (
        <div className="tabelaequipa">
            
        </div>
    );
}

async function getTeams() {
    const response = await fetch("http://localhost:8000/api/teams");
    const data = await response.json();
    // console.log('tudo',data);
    return data;
}

export default Tabel;