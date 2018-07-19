'use strict'

module.exports = (sequelize,DataType) => {
    const AdditionalAttribute = sequelize.define('AdditionalAttribute', {
     
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        type: {
            type: DataType.STRING,
            allowNull: false
        }
        
    })
    
    return AdditionalAttribute
}