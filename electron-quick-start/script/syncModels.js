'use strict'

var models = require('../assets/models')

models.sequelize.sync({force: true})
.then((model) => {
    console.log(model);
})
.catch(err =>{
    console.error(error.message || error);
    
})