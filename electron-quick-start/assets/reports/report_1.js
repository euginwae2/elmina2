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
            //console.log(x.dataValues);
            /* Array.prototype.forEach.call(x.dataValues,(y) => {
                console.log(y);
            }) */
        })
    })
)

page.appendChild(newTable.getTable());
 
/* 

let container = document.getElementById('reportContainer');

getAssetDispNames()
.then((res) => {
    console.log(res);
    buildHeader(res)
    .then((results) => {
        container.appendChild(results);
        
    })

});
models.Asset.findAll({order: [['id' , 'ASC']]})
.then((res) => {
    console.log(res);
    buildRow(res)
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {console.log(error);})
});
 */

// function getAssetDispNames () {
//     return new Promise(function(resolve, reject)
//         {
//     /**
//      * @description : get the displayd names of asset fields
//      */
//     var keys = [];
//      models.Field.findAll()
//      .then((res) => {
//          Array.prototype.forEach.call(res, (x) => {
//             keys.push(x.name);
//          }) 
//      })
//      .then(() => {resolve(keys)})
//      .catch((error) => { reject(error)});
//     })
// }

// function buildHeader (args) {
//     /**
//      * @description takes table column names and returns table title
//      */

//     return new Promise(function(resolve,reject) {
//         let titleBar = document.createElement('tr');
//         //titleBar.setAttribute('class', 'col-6');
//         Array.prototype.forEach.call(args.sort(),(y)=>{
//             let title = document.createElement('th');
//             title.appendChild(document.createTextNode(y));
//             //title.setAttribute('class', 'title');
//             titleBar.appendChild(title);  
//         })
//         resolve(titleBar);
//     })
    
// }

// function buildRow (args) {
//     /**
//      *@description Takes asset rows as imputs and returns as table rows
//      */
//     return new Promise (function (resolve, reject) {
        
//         console.log('size of args : ', args.length);
//         console.log('passed argument : ', args);
//         Array.prototype.forEach.call(args,(arg) => {
//             var rowContainer = document.createElement('tr');
            
//            // arg.dataValues
//             //console.log(arg.dataValues);
//              Array.prototype.forEach.call(arg.dataValues, (field) => {
//                 //var keys = Object.keys(field.dataValues);
//                 console.log(field);
//                 /* var row = document.createElement('td');
//                 row.appendChild(document.createTextNode(field.dataValues[keys]));
//                 console.logo(row); */
//             })
//             //rowContainer.appendChild(row);
//             //console.log(rowContainer); */
            
//         })
//         //resolve(rowContainer);
//     })
// }
