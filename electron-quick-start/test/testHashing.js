'use strict'

var crypto = require('crypto');

const salt = 'jklsdhhfjlkksdl'
const password = 'eaw1991tark'

var passwordData = crypto.createHmac('sha265',salt)
passwordData = passwordData.update(password)
console.log(passwordData)

//install bcrypt and test