'use strict'

var models = require('../assets/models');
const {BrowserWindow} = require('electron').remote
//TODO: Remove instances and reference to ipcRendere
var  reporList = document.getElementById('reportList');
var reportButton = document.getElementsByClassName('runReportButton');



models.Report.findAll({order: [['id', 'ASC']]})
.then(reports =>{
    console.log('reports:', reports);
    if (reports == null) {
       noReports(reporList)
    }
    else {
        populateReports(reports)
    }
})

 
function populateReports(reports)
{
    const  list = document.getElementById('reportList');
    const element1 = document.createElement('div');
    element1.setAttribute('class','col-3');
    element1.classList.add('titleBar');
    const title1 = document.createTextNode('Report Description');
    element1.appendChild(title1);
    const element2 = document.createElement('div');
    element2.setAttribute('class','col-2');
    element2.classList.add('titleBar');
    const title2 = document.createTextNode('Generate Report');
    element2.appendChild(title2);
    list.appendChild(element1);
    list.appendChild(element2);
    Array.prototype.forEach.call(reports,(report) => {
        try {
            addToList(report);
            addRunButton(report);
        } catch (error) {
            console.log(error)
        }
    })
}

function noReports (list) {
    const element = document.createElement('div');
    element.setAttribute('class','col-6');
    element.setAttribute('text-align','center');
    const text = document.createTextNode('No reports available');
    element.appendChild(text)
    list.appendChild(element);
}

function addToList(arg) {
    const  reportList = document.getElementById('reportList');
    var reportItem = document.createElement('div');
    reportItem.setAttribute('class','col-3');
    reportItem.classList.add('reportItem');
    const description = document.createTextNode(arg.reportName);
    reportItem.appendChild(description);
    reportList.appendChild(reportItem);
}

function addRunButton(report) {
    const  reportList = document.getElementById('reportList');
    var runButton = document.createElement('div');
    runButton.setAttribute('class','col-2 runReportButton');
    //runButton.classList.add('reportItem');
    //runButton.setAttribute('class','runReportButton');
    runButton.setAttribute('id','report_'+ report.id);
    const buttonText = document.createTextNode('Run');
    runButton.appendChild(buttonText);
    reporList.appendChild(runButton);
    /**
     * Add EventListener for button
     */
    runButton.addEventListener('click', (event) => {
        console.log('Report ID: ',event.target.id);

        const reportPath = './assets/reports/' + event.target.id + '.html';
        
        let win = new BrowserWindow({width: 400, height: 400});
        win.loadFile(reportPath);
    })

    
}