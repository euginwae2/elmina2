'use strict'

class User {

    constructor() {
        this.user_id
        this.user_name
        this.salt
        this.hash
        this.organization_id
        this.role_id
        this.firstName
        this.lastName

    }

    fullName () {
        return this.firstName +" "+ this.lastName
    }
    
}


module.exports = User;