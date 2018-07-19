'use strict'

var crypto = require('crypto');


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


function saltHashPassword(userpassword) {
    var salt = genRandomString(20);
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('Salt = ' +passwordData.salt);
}


saltHashPassword('eaw1991tark');
saltHashPassword('eaw1991tark');