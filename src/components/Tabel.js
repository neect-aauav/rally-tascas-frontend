import './Table.css';
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
        return(fetch("http://localhost:8000/api/bars")
            .then(response => response.json())
            .then(bars => {
                const trhead = document.createElement('tr');
                table.querySelector("thead").appendChild(trhead);
              
                // name column
                const thname = document.createElement('th');
                thname.innerHTML = "Name";
                trhead.appendChild(thname);

                bars.forEach((_, i) => {
                    const th = document.createElement('th');
                    trhead.appendChild(th);
                    th.innerHTML = "P"+(i+1);
                }); 

                // total column
                const thtotal = document.createElement('th');
                thtotal.innerHTML = "Total";
                trhead.appendChild(thtotal);
            }));
    }


    function updateTable(table, team) {
        const rowUpdates = [];
        let n_bars, rows;
        team.members.forEach((member, i) => {
            rowUpdates.push(new Promise((resolve, reject) => {
                fetch("http://localhost:8000/api/members/"+member.id)
                    .then(response => response.json())
                    .then(member_data => {
                        n_bars = member_data.bars.length;
                        rows = [];

                        const updateRow = row => {

                            // column swap
                            const columnSwap = (oldElem, newElem, value) => {
                                if (oldElem) row.replaceChild(newElem, oldElem);
                                else row.appendChild(newElem);
                                newElem.innerHTML = value; 
                            }

                            // fill name column
                            columnSwap(row.querySelector("td:nth-child(2)"), document.createElement('td'), member_data.name);

                            // fill points columns
                            member_data.bars.forEach((bar, j) => columnSwap(row.querySelector("td:nth-child("+(j+2)+")"), document.createElement('td'), bar.points));

                            // replace old total
                            columnSwap(row.querySelector("td:nth-child("+(n_bars+2)+")"), document.createElement('td'), member_data.points);                           
                        }

                        let tr = document.createElement('tr');
                        updateRow(tr);

                        resolve(tr);
                    });
            }));

        });

        // wait for all row updates and sort rows
        Promise.all(rowUpdates).then(rows => {
            if (table && rows) {
                // remove old rows
                table.querySelectorAll("tr:not(:first-child)").forEach(tr => tr.remove());

                // remove loading
                table.querySelector(".loading")?.remove();

                // sort rows
                Array.from(rows)
                    .sort((a, b) => {
                        const bTotal = parseInt(b.querySelector("td:last-child")?.innerHTML);
                        const aTotal = parseInt(a.querySelector("td:last-child")?.innerHTML);
                        return bTotal - aTotal;
                    })
                    .forEach(tr => table.append(tr));
            }
        });
    }

    getTeams().then(teams => {
        teams.forEach(team => {
            const home = document.querySelector(".Home");
            const table = createTable(home, team);
            fillTableHead(table)
                .then(() => {
                    // loading
                    const loading = document.createElement('div');
                    loading.classList.add('loading');
                    loading.innerHTML = "Loading...";
                    table.appendChild(loading);

                    // continously update members rows
                    setInterval(() => {
                        updateTable(table, team);
                    }, 1000);
                });
        });
    });
              
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