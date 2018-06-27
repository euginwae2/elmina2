const User  = require("../assets/classes/users.js")

const user = new User()
user.firstName = 'kwame'
user.lastName = 'Anane'
console.log(user.fullName())