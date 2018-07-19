console.log(' homer render process');
var path = require('path')
const nav = require('../assets/nav');

var setting = document.getElementById('user-settings');
const pages = document.getElementsByClassName('page')

setting.addEventListener('click', (event) => {
    nav.hideAllPages(pages);
    var settingsPage = document.getElementById('settings-view');
    nav.showPage(settingsPage);
})

