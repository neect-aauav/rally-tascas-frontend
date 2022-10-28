function createTable(wrapper, team) {
    if (wrapper) {
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
}

function fillTableHead(table, headers) {
    if (table) {
        // fill header row
        const thead = table.querySelector('thead');
        const headerRow = document.createElement('tr');
        thead.appendChild(headerRow);
        headers.forEach(header => {
            const th = document.createElement('th');
            headerRow.appendChild(th);
            if (header.split("/").length > 1) {
                // create image
                const img = document.createElement('img');
                img.src = header;
                th.appendChild(img);
            }
            else
                th.innerHTML = header;
        });
    }
}

export { createTable, fillTableHead };