'use strict'

module.exports = (sequelize,DataType) => {
    const additionalAttribute = sequelize.define('AdditionalAttribute', {
     
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        value: {
            type: DataType.STRING,
            defaultValue: null
        }
    })
    
    return additionalAttribute
}