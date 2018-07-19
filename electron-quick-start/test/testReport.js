'use strict'

var models = require('../assets/models');

models.Report.all()
.then(assets => {
    console.log(assets)
})