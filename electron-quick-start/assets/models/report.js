'use strict'

module.exports = (sequelize,DataTypes) => {
    const Report = sequelize.define('Report',{
        
        queryString: {
            type: DataTypes.TEXT
        }
    })

    return Report
}