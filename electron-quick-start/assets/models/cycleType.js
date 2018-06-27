'use strict'

module.exports = (sequelize,DataTypes) => {
    const CycleType = sequelize.define('CycleType', {
        
        type: {
            type: DataTypes.STRING
        }
    })

    return CycleType
}