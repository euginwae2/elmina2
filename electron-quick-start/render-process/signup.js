const {ipcRenderer} = require('electron');
console.log('render-process/signup.js');
var models = require('../assets/models');
var nav = require('../assets/nav');
var crypto = require('crypto');



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
    const user = getFormData();
    if (nameCheck(firstName,lastName) == false) {
        notification.innerHTML = 'first and last name cannot be empty';
    } else {
        //ipcRenderer.send('signup-user', getFormData())
        createUser(getFormData(),models);
              
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

    return {
        'userName': userName.value,
        'password': password.value,
        'firstName': firstName.value,
        'lastName': lastName.value
    }
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

function nameCheck (firstName,lastName) {
    var logic = firstName.value !='' && lastName.value !=''
    return logic
}

function createUser(args,models) {
   const userSalt = genRandomString(20); //salt length has been set to 20
   const userHash = sha512(args.password,userSalt);
   //console.log(userSalt);
    models.User
    .create({userName: args.userName, salt: userHash.salt, hash: userHash.passwordHash, firstName: args.firstName, lastName: args.lastName})
    .then((created) => {
        console.log('created status : ',created);
        const pages = document.getElementsByClassName('page');
        const loginView = document.getElementById("login-view");
        nav.hideAllPages(pages);
        nav.showPage(loginView); 
    })
    .catch(error => {
        console.log(error)
        const userCreationNotif = document.getElementById('signupNotification');
        userCreationNotif.innerHTML = 'Unable to create user'
    }); 
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

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length) {
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex')
        .slice(0,length);
};

