'use strict'
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename)
var fs = require('fs');
var db ={};


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


fs
    .readdirSync(__dirname)
    .filter(file => {
        var result =  ((file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
        console.log(result)
        return result
    })
    .forEach(file => {
        var model = sequelize['import'](path.join(__dirname,file));
        db[model.name] = model;
        console.log('importing', model.name)
    });

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
            console.log('Associating', modelName)
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    module.exports = db;