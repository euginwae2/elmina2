const User  = require("../assets/classes/users.js")

const user = new User()
/* user.firstName = 'kwame'
user.lastName = 'Anane'
*/
console.log('Full Name', user.getFullNameById(1));