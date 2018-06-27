'use strict'

module.exports = (sequelize,DataTypes) => {
    var Event = sequelize.define('Event',{
       
        attributeName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        oldValue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        newValue: {
            type: DataTypes.STRING,
            allowNull: false}
    })

    Event.associate = function(models) {
        models.Event.belongsTo(models.Asset)
    }

    return Event
}