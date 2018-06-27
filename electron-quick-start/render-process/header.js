var logoIcon  = document.getElementById('logo-icon')
var onlineIndicator  = document.getElementById('online-status')
var settings  = document.getElementById('user-settings')
var logout = document.getElementById('logout')

/**
 * Describe what happens on clicks
 */
logoIcon.addEventListener('click',(event) => {
    event.preventDefault();
    console.log('logo-icon has been clicked')
})

onlineIndicator.addEventListener('click',(event) => {
    event.preventDefault();
    console.log('onlineIndicator has been clicked')
})

settings.addEventListener('click',(event) => {
    event.preventDefault();
    console.log('settings has been clicked')
})

logout.addEventListener('click',(event) => {
    event.preventDefault();
    console.log('logout has been clicked')
})