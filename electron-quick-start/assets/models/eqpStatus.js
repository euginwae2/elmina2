'use strict'

module.exports = (sequelize,DataType) => {
    var EqpStatus = sequelize.define('EqpStatus',{

        name: {
            type: DataType.STRING
        }
    })

    return EqpStatus
}