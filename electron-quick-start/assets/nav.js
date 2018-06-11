const settings = require('electron-settings')

function hideAllPages () {
    const pages = document.querySelectorAll('page')
    Array.prototype.forEach.call(pages,(page => {
        page.classList.remove('.is-shown')
    }))
}

function showPage(id) {
    document.getElementById(id).classList.add('.is-shown')
}