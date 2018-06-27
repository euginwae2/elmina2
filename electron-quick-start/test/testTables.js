'use strict'

const Application = require('spectron').Application
const electron = require('electron')
const setup = require('./setup')
const sequelize = require('sequelize')
const pg =  require('pg')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

const path = require('path')
var models = require('../assets/models');
let all = undefined
chai.should()
chai.use(chaiAsPromised)
 
//require('../assets/models')
/* .sequelize
.sync()
.then(() => {
    console.log('sync complete')
}) */
//.then(
models.User.findAll({where: {userName: 'kwamewae'}})
.then(result => {
      console.log('all: ',result)
    })/* .then((result)  =>{
      //console.log('Results All:',result)
  }) */
  .catch(function(error) {
      console.error('Error on Test', error);
  })


