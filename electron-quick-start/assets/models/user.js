'use strict'

module.exports = (sequelize,DataTypes) => {
    var User = sequelize.define('User', {
          
            userName: {
                type: DataTypes.STRING(25),
            },
            salt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            hash: {
                type: DataTypes.STRING,
            },
            firstName: {
                type: DataTypes.CHAR
            },
            lastName: {
                type: DataTypes.CHAR
            }
    })

    User.associate = function (models) {
        models.User.belongsTo(models.Organization);
        models.User.belongsToMany(models.Role, {through:'UserRoles'});
        models.User.hasMany(models.Event);
    };

    return User
}