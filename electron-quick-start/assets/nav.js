const settings = require('electron-settings')

function hideAllPages (pages) {
    console.log('hiding all pages')
    //const pages = document.querySelectorAll('page')
    console.log(pages) 
    Array.prototype.forEach.call(pages,(page => {
        page.classList.remove('is-shown')
    }))
}

function showPage(id) {
    id.classList.add('is-shown')
}

function hidePage(id) {
    id.classList.remove('is-shown')
}

console.log("assets/nav")

module.exports = {
    hideAllPages,
    hidePage,
    showPage
}