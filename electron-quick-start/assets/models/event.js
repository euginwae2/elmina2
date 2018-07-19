'use strict'

module.exports = (sequelize,DataTypes) => {
    var Event = sequelize.define('Event',{
       
        attributeName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        oldValue: {
            type: DataTypes.STRING
            
        },
        newValue: {
            type: DataTypes.STRING
            }
    })

    Event.associate = function(models) {
        models.Event.belongsTo(models.Asset)
    }

    return Event
}