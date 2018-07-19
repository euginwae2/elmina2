'use strict'
module.exports = (sequelize,DataType) => {
    var Field = sequelize.define('Field', {
        type: {
            type: DataType.STRING
        },
        name: {
            type: DataType.STRING, comment: 'The name to be shown in the UI',
            allowNull: false
        },
        status: {
            type: DataType.STRING
        },
        dbName: {
            type: DataType.STRING
        }

    })
    return Field
}