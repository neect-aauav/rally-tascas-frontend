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

// column swap
const columnSwap = (row, oldElem, newElem, value) => {
    if (oldElem) row.replaceChild(newElem, oldElem);
    else row.appendChild(newElem);

    const content = document.createElement('div');
    newElem.appendChild(content);
    content.innerText = value;
    // newElem.innerHTML = value; 
}

function updateRow(table, oldRow, newRow) {
    // get row values
    const oldValues = oldRow ? Array.from(oldRow.children).map(td => td.innerText) : [];
    
    // compare old values with new ones
    const newValues = [];
    // format new values
    for (let value of newRow) {
        if (value === true) value = "✔️";
        else if (value === false) value = "❌";
        else if (!isNaN(value)) value = String(value);

        newValues.push(value);
    }

    const changed = oldValues.length === 0 || oldValues.some((value, i) => value !== newValues[i]);
    if (changed) {
        const row = document.createElement('tr');
        
        if (oldRow) table.replaceChild(row, oldRow);
        else table.appendChild(row);
        
        row.addEventListener("click", () => {
            // scroll to div with given id
            const id = "#"+newRow[1].replaceAll(" ", "-");
            window.scrollTo(0, document.querySelector(id).offsetTop);
        });
        newValues.forEach((column, j) => columnSwap(row, row.querySelector("td:nth-child("+(j+1)+")"), document.createElement('td'), column));
    
        if (oldRow) {
            // highlight new row
            row.classList.add('updated-row');
            setTimeout(() => row.classList.remove('updated-row'), 2000);
        }

        return row;
    }

    return oldRow;
}

export { createTable, fillTableHead, updateRow };