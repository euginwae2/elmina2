'use strict'
const {ipcRenderer} = require('electron')


var notificationBar = document.getElementById('asset-view-notification');




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