'use strict'

module.exports = (sequelize,DataType) => {
    var Asset = sequelize.define('Asset',{
        
        status: {
            type: DataType.STRING
        },
        
        description: {
            type: DataType.STRING,
            allowNull: false
        },
        
        serialNumber: {
            type: DataType.STRING
        },
        modelNumber: {
            type: DataType.STRING
        },
        location: {
            type: DataType.STRING
        },
        comment: {
            type: DataType.TEXT
        },
        nextCal: {
            type: DataType.STRING
        },
        lastCal: {
            type: DataType.STRING
        }

    })

    Asset.associate = function(models) {
        models.Asset.hasOne(models.CycleType)
        models.Asset.hasOne(models.PmType)
        models.Asset.hasMany(models.Attachment)
        //models.Asset.hasMany(models.AdditionalAttribute)
    }

    return Asset
}