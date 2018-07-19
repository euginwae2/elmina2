'use strict'
var models = require('../assets/models');

models.Field.sequelize.sync({force: true})