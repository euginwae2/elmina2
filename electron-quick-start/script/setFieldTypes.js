var models = require('../assets/models')

models.Field.bulkCreate([
    {name: 'id', type: 'text'},
    {name: 'description', type: 'text'},
    {name: 'serialNumber', type: 'text'},
    {name: 'modelNumber', type: 'text'},
    {name: 'location', type: 'text'},
    {name: 'comment', type: 'text'},
    {name: 'nextCal', type: 'date'},
    {name: 'lastCal', type: 'date'}
])
.then((model) => {
    console.log(model)
})