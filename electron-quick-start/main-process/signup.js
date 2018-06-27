const {ipcMain} = require('electron')

let signupData = undefined
ipcMain.on('signup-user', (event,arg) => {
    console.log('signup-user called')
    console.log(arg)
    signupData = JSON.parse(arg)
})

//signup user
var models = require('../assets/models')
const sequelize = require('sequelize')

