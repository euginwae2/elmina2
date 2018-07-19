'use strict'

var models = require('../models');

class User {

    constructor() {
        this.user_id;
        this.user_name;
        this.salt;
        this.hash;
        this.organization_id;
        this.role_id;
        this.firstName;
        this.lastName;
        this.fullName;
    }
      
    getFullNameById (id) {
        this.user_id = id;
        models.User.findById(id)
        .then((results) => {
            this.firstName = results.firstName;
            this.lastName = results.lastName;
        })
        .then(() => {
           this.fullName = this.firstName +' '+ this.lastName;
        })
        .then(() => {
            //console.log(this.fullName)
            return this.fullName
        })
        .catch((error) => {
            console.error(error || error.message);
        })
    }
   
}


module.exports = User;