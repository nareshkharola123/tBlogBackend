const Sequelize = require('sequelize');


const sequelize = new Sequelize('tblogdatabase', 'arun', 'abc@123', {
    host: 'localhost',
    dialect: 'postgres'
});


module.exports = sequelize;