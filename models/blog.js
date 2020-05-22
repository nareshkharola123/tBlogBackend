const Sequelize = require('sequelize');

const sequelize = require('../util/database-conf');


const Blog = sequelize.define('blog', {
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
    },
    description: {
        type: Sequelize.STRING,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    blogCreated: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
});


module.exports = Blog;