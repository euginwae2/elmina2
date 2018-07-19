'use strict'
var models = require('../models');

class Asset {
    constructor (id) {
        this.id = id | undefined;
    }

    /**
     * @param dbAttribute, newValue
     * @function update the given asset parameter with the given newValue 
     */
    update(attribute , newValue) {
        let newId = this.id;
        return new Promise(function(resolve,reject) {
            models.Asset.update({[attribute] : newValue},{where: {id: newId}})
            .then((asset) => {
                resolve(asset)
            })
            .catch((error) => {reject(error)})
    })
    }
    

}

module.exports = Asset;