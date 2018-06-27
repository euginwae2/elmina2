const {ipcRenderer} = require('electron')

const navViews = document.getElementsByClassName('nav-view')

const dashNav = document.getElementById('dashboard-nav')
const assetNav = document.getElementById('asset-nav')
const reportNav = document.getElementById('report-nav')

const dashView = document.getElementById('dashboard-view');
const assetView = document.getElementById('asset-view');
const reportView = document.getElementById('report-view');
console.log('render-process/nav-bar.js')

dashNav.addEventListener('click', (event) => {
    event.preventDefault();
    hideAllViews(navViews)
    showView(dashView)
})

assetNav.addEventListener('click', (event) => {
    event.preventDefault();
    hideAllViews(navViews);
    showView(assetView);
})

reportNav.addEventListener('click', (event) => {
    event.preventDefault();
    hideAllViews(navViews);
    showView(reportView);
})

function hideAllViews(views) {
    Array.prototype.forEach.call(views,(view => {
        view.classList.remove('is-shown');
    }))
}

function showView (view) {
    view.classList.add('is-shown');
}

function hideView(view) {
    view.classList.remove('is-shown');

}