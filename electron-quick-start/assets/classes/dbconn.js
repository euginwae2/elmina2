'use strict'
const Sequelize = require('sequelize')

class Dbconn extends Sequelize {
    constructor () {
        super()
        this.database = 'postgres'
        this.options.host = 'localhost'
        this.username = 'postgres'
        this.password = 'eaw1991tark'
        this.options.dialect = 'postgres'
        /* this.sequelize = new Sequelize(this.database,this.username,this.password, {
        host: this.host,
        dialect: 'postgres' */
    }
    
    connect () {
        this.sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.')
            return(this.sequelize)
        }).catch(err => {
            console.error('Unable to connect to the database:',err);
        })
    }

}


module.exports = Dbconn;