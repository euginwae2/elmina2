'use strict'
var models = require('../models');
var Status = require('../classes/status');
var Asset = require('../classes/Asset');
var Event = require('../classes/assetEvent');

class PopUp {
    
    constructor()
    {
        this.popUp = document.getElementById('pop-up-container'); 
        this.cancel = document.getElementById('popup-cancel');
        this.save = document.getElementById('popup-save');
        this.content = document.getElementById('popup-content');
        this.comment = document.getElementById('popUpComment');
        this.currentAttributeValue = undefined;
        this.newAttributeValue = undefined;
        this.cancel.addEventListener('click', (event) => {
            this.hide();
        })
    }

    show(event, id)
    {
        this.popUp.classList.add('is-shown');
        let attribute = event.target.id
        let length  = attribute.length;
        let attributeValue = attribute.toString().slice(6,length);
        let dbAttribute = attributeValue.slice(5,)
        console.log('attributeValue :', attributeValue);
        console.log('attribute:', attribute);
        console.log('dbattribute:', dbAttribute);
        
        this.content.innerHTML = '';
        let idContainer = document.createElement('div');
        idContainer.innerHTML = 'ID';
        let idValue = document.createElement('div');
        idValue.innerHTML = id;
        this.content.appendChild(idContainer);
        this.content.appendChild(idValue);


        models.Field.findOne({where: {dbName: attributeValue}})
        .then((res) => {
            console.log(res);
            //Create field label and values
            let fieldLabelContainer = document.createElement('div');
            fieldLabelContainer.innerHTML = 'Field';
            let fieldValuelContainer = document.createElement('div');
            fieldValuelContainer.innerHTML = res.name;
            this.content.appendChild(fieldLabelContainer);
            this.content.appendChild(fieldValuelContainer);
            //Create current label and value
            let currentLabelContainer = document.createElement('div');
            currentLabelContainer.innerHTML = 'Current Value';
            let currentValueContainer = document.createElement('div');
            currentValueContainer.innerHTML  = event.target.value;
            this.content.appendChild(currentLabelContainer);
            this.content.appendChild(currentValueContainer);
            //Create new value label
            let newValueLabelContainer = document.createElement('div');
            newValueLabelContainer.innerHTML = 'New Value'
            this.content.appendChild(newValueLabelContainer);
            let newValueValueContainer = document.createElement('div');
            this.content.appendChild(newValueValueContainer);
           
            switch (res.type) {
                case 'text':
                    var newValue = document.createElement('input');
                    newValue.setAttribute('id', 'newValue');
                    newValue.setAttribute('type','text');
                    newValueValueContainer.appendChild(newValue);
                    break;
                case 'select':
                    let status = new Status();
                    status.getStatus()
                    .then((res) => {
                        newValueValueContainer.appendChild(res);
                    })
                    break;
                case 'date':
                    var newValue = document.createElement('input');
                    newValue.setAttribute('id', 'newValue');
                    newValue.setAttribute('type','date');
                    newValueValueContainer.appendChild(newValue);
                    break;

                case 'radio':
                    var newValue = document.createElement('input');
                    newValue.setAttribute('id', 'newValue');
                    newValue.setAttribute('type','radio');
                    newValueValueContainer.appendChild(newValue);
                    break;
                default:
                    console.log('Pop Up error input type unkown');
                    break;
            }
            
            let cont = document.createElement('div');
            let comment = document.createElement('textarea');
            comment.setAttribute('placeholder', 'comment');
            comment.setAttribute('id', 'popUpComment');
            comment.setAttribute('cols', '50');
            comment.setAttribute('rows', '10');
           // cont.appendChild(comment);
           /**
            * TODO: Add comment to event table and implement comment upload
            */
            this.content.appendChild(cont);
            
            /**
             * when save button is clicked, add new value and comment if any as event
             */
            this.save.addEventListener('click',(event) => {
                
                this.currentAttributeValue = event.target.value;
                var editedAsset = new Asset(id);
                
                if (newValue !== undefined)
                    { //update all but select fields 
                    editedAsset.update(dbAttribute,newValue.value)
                    .then((res) => {
                        console.log('Update results',res);
                        this.newAttributeValue = newValue.value;
                    })
                    .then(() => {
                        var event = new Event(id,'Attribute Edit',dbAttribute,this.currentAttributeValue,this.newAttributeValue);
                        event.logEvent();
                        this.hide();
                    })
                    console.log('New value', newValue.value);}
                else
                    { //Update select field
                     var selectedValue = newValueSelect.options[newValueSelect.selectedIndex].value;
                     editedAsset.update(dbAttribute,selectedValue)
                     .then((res) => {
                        console.log('Update results',res);
                        this.newAttributeValue = selectedValue;
                     })  
                     .then(() => {
                        var event = new Event(id,'Attribute Edit',dbAttribute,selectedValue,this.newAttributeValue);
                        event.logEvent();
                         this.hide();
                     })
                       //console.log('Selected Index', newValueSelect.selectedIndex);
                        
                    } 
                //asset.update(dbAttribute, )
                console.log(editedAsset);

            })
        })
 
    }

    hide ()
    {
        this.popUp.classList.remove('is-shown');
    }
}

module.exports = PopUp;