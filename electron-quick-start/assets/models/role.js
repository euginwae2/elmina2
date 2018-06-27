'use strict'

module.exports = (sequelize,DataTypes) => {
    var Role = sequelize.define('Role',{
        
        roleType: {
            type: DataTypes.STRING
        }
    })
    Role.asssociate = function (models) {
        models.Role.belongsToMany(models.User, {through:'UserRoles'})

    }

    return Role
}

