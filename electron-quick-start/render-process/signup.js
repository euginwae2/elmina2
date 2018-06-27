const {ipcRenderer} = require('electron');
console.log('render-process/signup.js');


//Get HTML elements
const signup = document.getElementById('signup-submit');
const userName = document.getElementById('signup-username');
const password = document.getElementById('signup-password');
const passwordReentered = document.getElementById('signup-password2');
const firstName = document.getElementById('signup-firstName');
const lastName = document.getElementById('signup-lastName');


//Define what happens when submit is clicked
signup.addEventListener('click', (event) => {
    event.preventDefault()
    const notification = document.getElementById('signupNotification')
    if (finalCheck(firstName,lastName) == false) {
        notification.innerHTML = 'first and last name cannot be empty';
    } else {
        ipcRenderer.send('signup-user', getFormData())
    }
});

//Define check and prompts when user is typing
userName.addEventListener('keyup', (event) => {
    userNameIsAcceptable(userName.value)
})

password.addEventListener('keyup', (event) => {

})

passwordReentered.addEventListener('keyup', (event) => {
    passwordIsAcceptable(passwordReentered.value)
    passwordMach(password.value, passwordReentered.value)
})

firstName.addEventListener('keyup', (event) => {
    const notification = document.getElementById('signupNotification')
    notification.innerHTML = '';
})

lastName.addEventListener('keyup', (event) => {
    const notification = document.getElementById('signupNotification')
    notification.innerHTML = '';
})


function getFormData() {

    return JSON.stringify({
        'userName': userName.value,
        'password': password.value,
        'firstName': firstName.value,
        'lastName': lastName.value
    })
}

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

function passwordMach(pas1,pas2) {
    if (pas1 == pas2)
    {
        return true
    } else{
        notifyPassword('Passwords do not match')
        return false
    }
}

//returns true if special characters are detected
function splCharCheck(params) {
    console.log(params.match(/[^0-9a-zA-Z]/))
    if(params.match(/[^0-9a-zA-Z]/) != null)
    {return true}
    else 
    {return false}
}

function notifyUserName(msg) {
    const userNotif = document.getElementById('signupUserNameNotfication')
    userNotif.innerHTML = msg;
}

function notifyPassword(msg) {
    const passwordNotif = document.getElementById('signupPasswordNotification');
    passwordNotif.innerHTML = msg;
}

function finalCheck (firstName,lastName) {
    var logic = firstName.value !='' && lastName.value !=''
    return logic
}

