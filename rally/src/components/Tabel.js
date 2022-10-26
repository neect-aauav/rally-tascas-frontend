import React,{useEffect} from "react";
import './Tabel.css';
function Tabel() {
   
    let fetchresult;    
    
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

    useEffect(() => {
        makeTables(fetchresult);
    }, []);

    // infinite loop to fetch data
    setInterval(() => {
        fetch("http://localhost:8000/api/teams")
            .then(response => response.json())
            .then(data => {
                fetchresult = data;
                console.log(fetchresult);
            });
    }, 1000);

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