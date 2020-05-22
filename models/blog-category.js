const Sequelize = require('sequelize');

const sequelize = require('../util/database-conf');


const BlogCategory = sequelize.define('blogCategory', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});


module.exports = BlogCategory;