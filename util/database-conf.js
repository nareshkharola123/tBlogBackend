
var Sequelize = require('sequelize');

var sequelize = new Sequelize('tblogdatabase', 'arun', 'abc@123', {
    host: 'localhost',
    dialect: 'postgres'
});


module.exports = sequelize;