'use strict'

module.exports = (sequelize, DataType) => {
    const AdditionalAttributeValue = sequelize.define('AdditionalAttributeValue', {
        value: {
            type: DataType.STRING
        }
    })

    AdditionalAttributeValue.associate = function(models) {
        models.AdditionalAttributeValue.belongsTo(models.AdditionalAttribute)
        models.AdditionalAttributeValue.belongsTo(models.Asset)
    }

    return AdditionalAttributeValue
}