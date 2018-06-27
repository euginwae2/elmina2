'use strict'
const Sequelize = require('sequelize')                                                          

//Db variables
const database = 'postgres';
const host = 'localhost';
const username = 'postgres';
const password = 'eaw1991tark';
const dialect = 'postgres';

const sequelize = new Sequelize(database,username,password,{
    host: host,
    dialect: dialect
});



sequelize
    .authenticate()
    .then(()=>{
        console.log('Connection has been established successfully')
    })
    .catch(err=> {
        console.error('Unable to connect to database:', err);
        
    }).then(() =>{
        const User = sequelize['import']('../assets/models/user.js')
        const Kwame = new User(sequelize,Sequelize)
        Kwame.sequelize.sync({force: true})
        //console.log(Kwame)

    })