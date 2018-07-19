'use strict'

class ChartContainer {
    constructor () {
        this.script;
    }
    
    /**
     * 
     * @param {string} description 
     * @param {string} canvas_id 
     */
    container (descpt,canvas_id) {
        let container  = document.createElement('div');
        container.classList.add('col-1');
        container.classList.add('row-1');
        
        /* let descriptionBar = document.createElement('div');
        descriptionBar.classList.add('col-6');
        descriptionBar.classList.add('row-3'); */
        let chartObj = document.createElement('canvas');
        chartObj.classList.add('col-6');
        chartObj.classList.add('kpi');
        //chartObj.classList.add('row-5');
        chartObj.setAttribute('id',canvas_id)
        //descriptionBar.innerHTML = descpt;
        container.appendChild(chartObj);
        //container.appendChild(descriptionBar);
        
        return container;
    }

    /**
     * @function 
     * @param {the element to be attached} obj 
     * @param {the element to attach obj to} parent 
     */
    attachTo(obj,parent) {
        parent.appendChild(obj);
    }
    
}

module.exports = ChartContainer;