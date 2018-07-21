'use strict'

class ReportTable {
    constructor ()
    {
        this.table = document.createElement('table');
        this.table.classList.add('reportTable');
        this.column;
        
    }
    
    addColumn()
    {
        this.column = document.createElement('tr');
        this.table.appendChild(this.column);

    }
    
            
    addCell(arg)
    {
        let cell = document.createElement('td')
        cell.innerHTML = arg;
        this.column.appendChild(cell);
    }

    addTitle(arg)
    {
        let title = document.createElement('th');
        title.innerHTML = arg;
        this.column.appendChild(title);   
    }

    getTable()
    {
        return this.table;
    }
}

module.exports = ReportTable;