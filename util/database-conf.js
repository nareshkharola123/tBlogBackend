const Sequelize = require('sequelize');

const databaseConf = require('./secret-data.json').databaseConf;


const sequelize = new Sequelize(databaseConf.database, databaseConf.user, databaseConf.password, {
    host: databaseConf.host,
    dialect: databaseConf.dialect
});


module.exports = sequelize;