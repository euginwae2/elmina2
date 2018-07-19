'use strict'

const {ipcRenderer} = require('electron')
var models = require('../assets/models')
var assetList = document.getElementById('assetList')
var addNewAsset = document.getElementById('newAssetButton')
var allAssets = undefined;
const AssetEvent = require('../assets/classes/assetEvent');
const EventTable = require('../assets/classes/eventsTable');
var Status = require('../assets/classes/status');
var PopUp = require('../assets/classes/popUp');
var dFields = document.getElementsByClassName('dataField');

getAllAssets(models);


document.addEventListener('click',(event) => {
    if (event.target.className == "listItem") {
        deselectAll(assetList.children);
        setAsSelected(event.target);
        populateAssetView(models,event.target.id)
    }
    else { false}
})

addNewAsset.addEventListener('click',(event) => {
    newAsset(models)
})


function getAllAssets(models) {
    var list = document.getElementById('assetList')
    list.innerHTML = "";

    models.Asset.findAll({order: [['id', 'ASC']]})
    .then(assets => {
        allAssets = assets;
        console.log('all assets :', allAssets);
        console.log('Asset length', allAssets.length);
        if(allAssets.length == 0) {
            console.log('No Assets Entered');
        }
        else {
        Array.prototype.forEach.call(assets, (asset) => {
            makeListItem(asset);
        });
        }
        return assets;
    })
    .then((assets) => {
        //getFirstDiv
        if (assets == undefined) {
        console.log('Assets :',assets);
        } else {
        selectFirst(assetList,models);
        }
        Array.prototype.forEach.call(dFields,(dField) => {
            dField.addEventListener('click',(event) => {
                let id = document.getElementById('field_core_id');
                var popUp = new PopUp();
                popUp.show(event,id.value);
            })
        })
    })
    .catch(error => { console.error(error || error.message)});
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
    //list.innerHTML = "";
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

function selectFirst (list, models) {
    setAsSelected(list.children[0])
    console.log('first selected asset',list.children[0]);
    const itemId = getItemId(list.children[0].id)
    populateAssetView(models,list.children[0].id);
}

function populateAssetView(models, targetId) {
    //Extract id of selected asset
    const length = targetId.length;
    const id = targetId.toString().slice(7,length);
    populateAttributeView(models, id); 
    populateEventView( id); 
}

function populateEventView(targetId) {
    const eventView = document.getElementById('eventView');
    eventView.innerHTML = "";
    var table = new EventTable(targetId,eventView);
    table.addEvents();

}

function populateAttributeView(models, targetId) {
    const attributeView = document.getElementById('attributeView');
    models.Asset.findById(targetId)
    .then(asset =>{
       populateAttributeFields(asset);
        console.log('Selected Asset :', asset);
    })
    .catch(error => { console.error(error || error.message)});
}

function populateAttributeFields (args)
{
    getFields(args);
    //return JSON.stringify(args)
}

function populateEventFields(args) {
    
    return JSON.stringify(args)
}

function getItemId (itemId) {
    const length = itemId.length;
    const id = itemId.toString().slice(7,length);
    return id;
}

function getFields(asset) {
    const dataFields = document.getElementsByClassName('dataField');
    var keys = Object.keys(asset.dataValues);
    var i = 0
    console.log('Returned size: ',asset.length)
    try {
    Array.prototype.forEach.call(dataFields,(dataField) => {
        let length = dataField.length;
        var selector = dataField.id.toString().slice(11,length);
        console.log('Selector: ', selector);
        dataField.value = asset[selector];
        i++;
        console.log('dataField id = ', dataField.id);
        console.log('dataField value = ', asset[keys[i]]);
        console.log('Keys: ',keys);
        })
    }
    catch (error)
    {
        console.log(error)
    }
}

function newAsset () {
    const attributeForm = document.getElementById('attributeForm');
    attributeForm.innerHTML ='';
    models.Field.all()
    .then(field => {
        
        Array.prototype.forEach.call(field,(x) => {
            console.log('field type:', x.type)
           /*  switch (x.type) {
                case 'text': */
                var element = document.createElement('div');
                element.setAttribute('class', 'col-8');
                var element2 = document.createElement('div')
                var fieldName = document.createTextNode(x.name);
                element2.appendChild(fieldName);
                element.appendChild(element2);

                var textType = document.createElement('input');
                textType.setAttribute('type','text');
                textType.setAttribute('id', 'field_'+ x.dbName);
                textType.setAttribute('class', 'dataField');
                element.appendChild(textType);
                attributeForm.appendChild(element);
                
        })
    })
    .then(() => {
        addAssetControls();
        deselectAll(assetList.children);
    })
}

function addAssetControls () {
    var container = document.createElement('div');
    container.setAttribute('class', 'row-3');
    var saveBtn = document.createElement('div');
    saveBtn.setAttribute('class', 'col-2 add-asset-controls');
    saveBtn.setAttribute('id', 'add-asset-saveBtn');
    saveBtn.innerHTML = 'Save';
    var cancelBtn = document.createElement('div');
    cancelBtn.setAttribute('class', 'col-2 add-asset-controls');
    cancelBtn.setAttribute('id', 'add-asset-cancelBtn');
    cancelBtn.innerHTML = 'Cancel';
    container.appendChild(cancelBtn);
    container.appendChild(saveBtn);

    const attributeView = document.getElementById('attributeView');
    attributeView.appendChild(container);

    saveBtn.addEventListener('click', (event) => {
        console.log('save button clicked');
        const dataFields = document.getElementsByClassName('dataField');
        const Asset = models.Asset.build();
        Array.prototype.forEach.call(dataFields, (dataField) => {
            var length = dataField.id.length;
            var column = dataField.id.slice(11,length);
            var inputData = dataField.value;         
            //Build query
            Asset[column] = inputData;
        })
        Asset.save()
        .then((res) => {
            console.log('Results of save:' , res.id);
            //TODO: create create an event to log assets creation
            var addEvent  = new AssetEvent(res.id, 'New Asset');
            addEvent.logEvent();
        })
        .then(() => {
            attributeView.removeChild(container);
            

        })
        .then(() => {
            getAllAssets(models)
        })
        .catch((error) => {
            console.error(error || error.message);
            showNotification('Unable to add Asset' + error);
        })
        
    });

    cancelBtn.addEventListener('click', (event) => {
        console.log('cancel button clicked');
        attributeView.removeChild(container);
        getAllAssets(models)
    });
    
}

function showNotification(msg) {
    var notificationBar = document.getElementById('asset-view-notification');
    notificationBar.classList.add('notifcation-is-shown')
    notificationBar.classList.remove('notifcation-is-hidden');
    notificationBar.innerHTML = notificationBar.innerHTML + msg;
    setTimeout(() => {
        notificationBar.classList.remove('notifcation-is-shown');
        notificationBar.classList.add('notifcation-is-hidden')
        //reset notification bar
        notificationBar.innerHTML = 'Notification :';
    }, 5000);
}