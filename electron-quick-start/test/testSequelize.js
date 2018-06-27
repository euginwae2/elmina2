/**
 * Test a sequelize model creation and sync
 */
const Sequelize = require('sequelize')                                                          

//Db variables
const database = 'postgres';
const host = 'localhost';
const username = 'postgres';
const password = 'eaw1991tark';
const dialect = 'postgres';

const sequelize = new Sequelize(database,username,password,{
    host: host,
    dialect: dialect
});

sequelize
    .authenticate()
    .then(()=>{
        console.log('Connection has been established successfully')
    })
    .catch(err=> {
        console.error('Unable to connect to database:', err);
        
    });

//Create a test model

const Person = sequelize.define('person',{
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

const Place = sequelize.define('place',{
    Name: {type: Sequelize.STRING},
    Continent: {type: Sequelize.STRING}
})


Person.belongsTo(Place)

sequelize.sync({force: true}).then(() => {
    return Person.create({
        firstName: 'Eugene',
        lastName: 'Anane'
    })
}).then(() => {
    sequelize.close();
})