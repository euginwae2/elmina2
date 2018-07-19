'use strict'

var models = require('../models');

class AssetEvent {
    constructor(assetId,type,attribute,oldValue,newValue) {
        this.assetId = assetId;
        this.type = type;// has to be 'New Asset' or 'attribute edit
        this.attribute = attribute || undefined;
        this.oldValue = oldValue || undefined;
        this.newValue = newValue || undefined;
        this.userId = 1;
        
    }

    logEvent() {
        if (this.type == 'New Asset')
        {
            models.Event.create({
                AssetId: this.assetId,
                attributeName: this.type,
                UserId: this.userId
            });
            console.log(this.type)
        }
        else
        {
            models.Event.create({
                AssetId: this.assetId,
                attributeName: this.type,
                oldValue: this.oldValue,
                newValue: this.newValue,
                UserId: this.userId
            });
            console.log(this.type)
        }

    }


}
module.exports = AssetEvent;