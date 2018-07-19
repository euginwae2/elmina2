'use strict'

console.log('settings render process')
var models = require('../assets/models');
const nav = require('../assets/nav')

const pages = document.getElementsByClassName('page')
const home = document.getElementById('home-view')
var settingsForm = document.getElementById('fieldsSettingForm');
var backButton = document.getElementById('backButton');
var saveButton = document.getElementById('fieldsSettingsButton');
var selectOptions = ['text', 'select','date', 'radio','hidden'];

backButton.addEventListener('click', (event) => {
    nav.hideAllPages(pages);
    nav.showPage(home);

})

saveButton.addEventListener('click', (event) => {
    //get all field titles
    var fieldInputs = document.getElementsByClassName('fieldSettingsInput');
    Array.prototype.forEach.call(fieldInputs,(x) => {
        models.Field.update({type: x.value}, {where: {dbName: x.id}})
        .then((results) => {
            console.log(results);
        })
    })
    var displayNames = document.getElementsByClassName('displayName');
    Array.prototype.forEach.call(displayNames, (x) => {
        models.Field.update({name: x.value}, {where: {name: x.id}})
        .then((result) => {
            console.log(result);
        })
    })
})


models.Field.findAll()
.then((fields) => {
    //Check to see if fields are populated
    console.log('All Field: ', fields.length);
    if (fields.length == 0) {
        require('../script/setUpFields.js');
        console.log('fields are empty');
    }
})
.then(() => { 
    models.Field.findAll()
    .then((fieldsNew) => {
        console.log('New Fields: ', fieldsNew);
        Array.prototype.forEach.call(fieldsNew,(field) => {
            addTitle(field);
            addInputs(selectOptions,field);
        });
    })
})
.catch(error => {
    console.log(error || error.message);
});


function addTitle(field) {
    var settingsForm = document.getElementById('fieldsSettingForm');
    var housing = document.createElement('div');
    housing.setAttribute('class', 'col-2 fieldTitle');
    housing.innerHTML = 'System Name: ' + field.dbName;
    settingsForm.appendChild(housing);
}

function addInputs(options,field) {
    var settingsForm = document.getElementById('fieldsSettingForm');
    var housing = document.createElement('div');
    addDisplayName(field.name, housing);
    housing.setAttribute('class', 'col-2');
    var selector = document.createElement('select');
    selector.setAttribute('class', 'fieldSettingsInput');
    selector.setAttribute('id', field.dbName);
    Array.prototype.forEach.call(options,(option) => {
        var opt = document.createElement('option');
        var txt = document.createTextNode(option);
        if (option == field.type)
        {
            opt.setAttribute('selected', 'selected');
        }
        opt.appendChild(txt);
        selector.appendChild(opt);
    });
    housing.appendChild(selector);
    settingsForm.appendChild(housing);
}

function addDisplayName(fieldName, housing) {
    var displayName = document.createElement('input');
    displayName.setAttribute('class', 'displayName');
    displayName.setAttribute('id', fieldName);
    displayName.value = fieldName;
    housing.appendChild(displayName);
}