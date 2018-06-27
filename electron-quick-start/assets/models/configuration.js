'use strict'

module.exports = (sequelize,DataTypes) => {
    var Configuration = sequelize.define('Configuration', {
        
        localStorageLocation: {
            type: DataTypes.TEXT
        },
        cloudserverURL: {
            type: DataTypes.TEXT
        }
    })

    Configuration.associate = function(models) {
        models.Configuration.belongsTo(models.Organization)
    }

    return Configuration
}