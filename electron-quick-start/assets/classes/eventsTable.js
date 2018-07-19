'use strict'
var models = require('../models');

class EventsTable {
    constructor (assetId, eventView){
        this.assetId = assetId;
        this.eventView = eventView;
  
    }

    addTitle() {
        var container = document.createElement('div');
        container.setAttribute('class', 'row-3');
        container.setAttribute('id', 'eventTitleBar');
        var eventSubBar = document.createElement('div');
        eventSubBar.setAttribute('class', 'col-5')
        eventSubBar.innerHTML = 'Event';
        var dateSubBar =  document.createElement('div');
        dateSubBar.setAttribute('class', 'col-10');
        dateSubBar.innerHTML = 'Date';
        var userSubBar = document.createElement('div');
        userSubBar.setAttribute('class', 'col-10');
        userSubBar.innerHTML = 'Performed By';
        container.appendChild(eventSubBar);
        container.appendChild(dateSubBar);
        container.appendChild(userSubBar);
        this.eventView.appendChild(container);
    }

    addEvents () {
        models.Event.findAndCountAll({
            where: {
                AssetId: this.assetId
            },
            order: [['createdAt' , 'ASC']]
        })
        .then((result) => {
            if (result.count > 0)
            {
                this.addTitle();
                //TODO: Add Events
                this.showEvent(result.rows);
                console.log('event count',result.count);
            }
            else
            {
                this.showNoEvents();
            }
        })
    }

    showNoEvents () {
        var container = document.createElement('div');
        container.setAttribute('class', 'row-3');
        container.setAttribute('id', 'eventTitleBar');
        container.innerHTML = 'No Events';
        this.eventView.appendChild(container);
    }

    showEvent(rows) {
        console.log('Event performed by',rows);
        Array.prototype.forEach.call(rows,(row) =>{
            if (row.attributeName == 'New Asset')
            {   
                models.User.findById(row.UserId)
                .then((res) => {
                    return res.firstName +' '+res.lastName;
                    console.log('Event performed by',res);
                })
                .then((result) => {
                    console.log(result);
                    var container = document.createElement('div');
                    container.setAttribute('class', 'eventItem');
                    var eventSubBar = document.createElement('div');
                    eventSubBar.setAttribute('class', 'col-5')
                    eventSubBar.innerHTML = 'Record Created';
                    var dateSubBar =  document.createElement('div');
                    dateSubBar.setAttribute('class', 'col-10');
                    dateSubBar.innerHTML = row.createdAt;
                    var userSubBar = document.createElement('div');
                    userSubBar.setAttribute('class', 'col-10');
                    userSubBar.innerHTML = result;
                    container.appendChild(eventSubBar);
                    container.appendChild(dateSubBar);
                    container.appendChild(userSubBar);
                    this.eventView.appendChild(container);
                })
                .catch((error) => {
                    console.log(error);
                })
            }
            else
            {
                models.User.findById(row.UserId)
                .then((res) => {
                    return res.firstName +' '+res.lastName;
                    console.log('Event performed by',res);
                })
                .then((result) => {
                    console.log(result);
                    var container = document.createElement('div');
                    container.setAttribute('class', 'eventItem');
                    var eventSubBar = document.createElement('div');
                    eventSubBar.setAttribute('class', 'col-5')
                    eventSubBar.innerHTML =  row.attributeName + ' Edited ' + 'Old Value : '+ row.oldValue + ' New Value : ' + row.newValue;   
                    var dateSubBar =  document.createElement('div');
                    dateSubBar.setAttribute('class', 'col-10');
                    dateSubBar.innerHTML = row.createdAt;
                    var userSubBar = document.createElement('div');
                    userSubBar.setAttribute('class', 'col-10');
                    userSubBar.innerHTML = result;
                    container.appendChild(eventSubBar);
                    container.appendChild(dateSubBar);
                    container.appendChild(userSubBar);
                    this.eventView.appendChild(container);
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        })
    }

}

module.exports = EventsTable;