'use strict'

var models = require('../assets/models');

var rawAtt = models.Asset.attributes;
var rawAddAtt = models.AdditionalAttribute.attributes;
var keys = [];

/** Add attributes from Assets table*/
for (var k in rawAtt) {
    keys.push('core_'+ k);
}

//console.log(rawAtt);

models.AdditionalAttribute.all()
.then((additionalAttributes) => {
    Array.prototype.forEach.call(additionalAttributes,(attribute) => {
        keys.push('additionalAttribute_' + attribute.name);
    })
})
.then(()=>{
    //console.log(keys);
    Array.prototype.forEach.call(keys,(key) => {
        models.Field.create({name: key, type: 'text', dbName: key ,status: 'active'})
    })
})
