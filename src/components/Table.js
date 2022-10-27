import './Table.css';
function Table() {

    function createTable(wrapper, team) {
        const tablewrapper = document.createElement('div');
        wrapper.appendChild(tablewrapper);
        tablewrapper.classList.add('table','basetabela')
        const title = document.createElement('div');
        title.classList.add('equipa');
        title.innerHTML = team;
        tablewrapper.appendChild(title);
        const table = document.createElement('table');
        table.classList.add('styled-table');
        tablewrapper.appendChild(table);
        const thead = document.createElement('thead');
        table.appendChild(thead);
        return table;
    }

    function fillTableHead(table) {
        return(fetch("https://rally-api.herokuapp.com/api/bars")
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
        // remove old rows
        table.querySelectorAll("tr:not(:first-child)").forEach(tr => tr?.remove());

        // column swap
        const columnSwap = (row, oldElem, newElem, value) => {
            if (oldElem) row.replaceChild(newElem, oldElem);
            else row.appendChild(newElem);
            newElem.innerHTML = value; 
        }

        team.members.forEach((member, i) => {
            // fill row with member data
            const row = document.createElement('tr');
            table.appendChild(row);
            if (row) {
                member.forEach((value, j) => {
                    columnSwap(row, row.querySelector("td:nth-child("+(j+1)+")"), document.createElement('td'), value);
                });
            }
        });
    }

    getTeams().then(teams => {
        const tables = [];
        const setupTables = teams.map(team => {
            return(new Promise((resolve, reject) => {
                const home = document.querySelector(".Home");
                const table = createTable(home, team.name);
                tables.push(table);

                fillTableHead(table).then(() => {
                    // loading
                    const loading = document.createElement('div');
                    loading.classList.add('loading');
                    loading.innerHTML = "Loading...";
                    table.appendChild(loading);

                    resolve(table);
                });
            }));
        });

        Promise.all(setupTables).then(tables => {
            // continously update members rows
            setInterval(() => {
                fetch("https://rally-api.herokuapp.com/api/scoreboard/members/all")
                    .then(response => response.json())
                    .then(teams => {
                        // remove loading
                        tables.forEach(table => table.querySelector(".loading")?.remove());

                        teams.forEach((team, i) => {
                            updateTable(tables[i], team);
                        });
                    });
            }, 1000);
        });
    });

    return (
        <div className="tabelaequipa">
            
        </div>
    );
}

async function getTeams() {
    const response = await fetch("https://rally-api.herokuapp.com/api/teams");
    const data = await response.json();
    return data;
}

export default Table;