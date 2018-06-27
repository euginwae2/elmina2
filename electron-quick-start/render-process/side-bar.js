'use strict'

const {ipcRenderer} = require('electron')
var models = require('../assets/models')
var assetList = document.getElementById('assetList')
console.log('render-process/side-bar.js')

console.log('side-bar.js')
document.addEventListener('click',(event) => {
    if (event.target.className == "listItem") {
        
        deselectAll(assetList.children)
        setAsSelected(event.target)
    }
    else { false}
})

getAllAssets(models)

function getAllAssets(models) {
    
    models.Asset.findAll()
    .then(assets => {
       // console.log(assets.length)
        Array.prototype.forEach.call(assets, (asset) =>{
            makeListItem(asset);

        });
    })
    .then(() => {
        //getFirstDiv
        selectFirst(assetList);
        
    })
}

function makeListItem(asset) {
    var listItem = document.createElement("div");
    var divId = "itemObj" + asset.id;
    listItem.setAttribute('id',divId);
    listItem.setAttribute('class','listItem');
    listItem.innerHTML = asset.id + ' ' + asset.description;
    addItemToList(listItem)
}

function addItemToList(listItem)
{
    var list = document.getElementById('assetList')
    list.append(listItem)
}

function setAsSelected(arg) {
    arg.classList.add('is-selected')
}

function deselect(arg) {
    arg.classList.remove('is-selected')
}

function deselectAll(args) {
    Array.prototype.forEach.call(args,(arg) => {
        deselect(arg)
    })
}
function selectFirst (list) {
    setAsSelected(list.children[0])
}


