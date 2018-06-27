'use strict'

module.exports = (sequelize,DataTypes) => {
    const PmType = sequelize.define('PmType',{
       
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return PmType
}