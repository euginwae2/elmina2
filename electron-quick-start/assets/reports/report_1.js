/**
 * Report 1
 * @description : Lists all Assets
 * @
 */

'use strick'
const path = require('path');
const currentPath = path.join( __dirname, '../classes/reportTable.js')
const Table  = require(currentPath);
const modelPath = path.join( __dirname, '../models')
models = require(modelPath);
let page = document.getElementById('reportContainer');
var ipcRenderer = require('electron');

addControlBar();
var newTable = new Table();

models.Field.findAll({order: [['id' , 'ASC']]})
.then((args) => {
    newTable.addColumn();
    Array.prototype.forEach.call(args,(y)=>{
        newTable.addTitle(y.name);
    })
})
.then(
    models.Asset.findAll({order: [['id' , 'ASC']]})
    .then((res) => {
        Array.prototype.forEach.call(res,(x) => {
            newTable.addColumn();
            for (key in x.dataValues)
            {
                newTable.addCell(x[key])
            }
        })
    })
)

page.appendChild(newTable.getTable());

function addPrintButton(parent)
{
    let printBtn = document.createElement('button');
    printBtn.innerHTML = 'Print To PDF';
    printBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const {ipcRenderer} = require('electron');
        ipcRenderer.send('print-to-pdf');
    })
    parent.appendChild(printBtn);
}

function addControlBar()
{
    let cntlBar = document.createElement('div');
    cntlBar.setAttribute('class', 'col-6');
    addPrintButton(cntlBar);
    page.appendChild(cntlBar);
}