'use strict'

const nav = require('../assets/nav')
const {ipcRenderer} = require('electron')
var models = require('../assets/models')
var crypto = require('crypto');
const mainConentent = document.getElementById("mainContent")
const pages = document.getElementsByClassName('page')

const loginUsername = document.getElementById('login-username')
const loginPassword = document.getElementById('login-password')

//wait 3 seconds then show login page
setTimeout(() => {
    const welcomeView = document.getElementById("welcomeView")
    nav.hidePage(welcomeView)
    const loginView = document.getElementById("login-view")
    //console.log(loginView)
    nav.showPage(loginView)
}, 3000);

//handel submit button click
const loginSubmit = document.getElementById('login-submit')
loginSubmit.addEventListener('click', (event) => {
    event.preventDefault()
    console.log('submit button clicked')
    doesUserExist(models, loginUsername.value, loginPassword.value)
    
})

//Handel signup button click
signupLink.addEventListener('click',(event) => {
    event.preventDefault()
    nav.hideAllPages(pages);
    const signup = document.getElementById('signup-view')
    nav.showPage(signup)
})

function doesUserExist(models, loginUsername, loginPassword,nav) {
    models.User.findOne({where: {userName: loginUsername}})
    .then(results => {
        if(results == null){
            notification('User Does not exist')
            return false
        }
        else {
            console.log('Does user exist: ', results.userName == loginUsername)
            console.log('userName :'+results.userName);
            console.log('salt: '+results.salt);

            var userData = sha512(loginPassword, results.salt)
            console.log(userData);
            if (userData.passwordHash == results.hash)
            {
                console.log('password authenticated')
                goToHome();
                return true
            }
            else 
            {
                console.log('passwords do not match');
                notification('Incorrrect credentials');
                //TODO: Implement login try counter and lock mechanism
            }
            
            
        }
    })
    .catch(error => {
        console.error('doesUserExist Error', error)
    })
}


function goToHome() {
    const nav = require('../assets/nav')
    const pages = document.getElementsByClassName('page')
    nav.hideAllPages(pages)
    const home = document.getElementById('home-view')
    nav.showPage(home)
    console.log('Go to Home Page')
}

function notification (msg) {
    const msgBox = document.getElementById('login-notification');
    console.log(msgBox)
    msgBox.innerHTML = msg
}


/**
 * Code below validates user enteries and sends warnings on invalid entries
 * 
 */
const userName = document.getElementById('login-username')
const password = document.getElementById('login-password')

userName.addEventListener('keyup', (event) =>{
    userNameIsAcceptable(userName.value)
})

password.addEventListener('keyup', (event) => {
    passwordIsAcceptable(password.value)
})

function userNameIsAcceptable(username) {
    notifyUserName('')
    if (username.length < 4) 
    {
        notifyUserName('Username is less than 4 chars')
        return false
    } 
    else if (splCharCheck(username) == true) 
    {    
        notifyUserName('Username can not include special characters')
        return false
    } 
    else {return true}
}

function passwordIsAcceptable(password) {
    notifyPassword('')
    if (password.length < 4)
    {
        notifyPassword('Password must be at least 4 chars long')
        return false
    } else{return true}
}

//returns true if special characters are detected
function splCharCheck(params) {
    console.log(params.match(/[^0-9a-zA-Z]/))
    if(params.match(/[^0-9a-zA-Z]/) != null)
    {return true}
    else 
    {return false}
}

function notifyUserName(message) {
    //notify user of username issues
    var userNameDiv = document.getElementById('userNameNotification')
    userNameDiv.innerHTML = message
}

function notifyPassword(message) {
    //notify the user of password Issues
    var passwordDiv = document.getElementById('passwordNotification')
    passwordDiv.innerHTML = message
}

/**
 * hash password with sha512
 * @function
 * @param {string} password
 * @param {string} salt
 */
var sha512 = function (password, salt) {
    var hash  = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash:value
    };
};