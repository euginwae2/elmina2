const Sequelize = require('sequelize')

var database = 'postgres'
var host = 'localhost'
var username = 'postgres'
var password = 'eaw1991tark'

const sequelize = new Sequelize(database,username,password, {
    host: host,
    dialect: 'postgres'
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
}).catch(err => {
    console.error('Unable to connect to the database:',err);
})



