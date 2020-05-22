const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const sequelize = require('./util/database-conf');
const blogRouter = require('./routes/blog');
const blogCategory = require('./routes/blog-category');
const BlogCategory = require('./models/blog-category');
const Blog = require('./models/blog');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes start from here

app.use('/api', blogRouter);
app.use('/api', blogCategory);

// router end here


//model relationship start here

Blog.belongsTo(BlogCategory, { 
    constraints: true, 
    onDelete: 'CASCADE',  
    foreignKey: {
    allowNull: false
  } 
});
BlogCategory.hasMany(Blog);

//model relationship end here

sequelize.sync()
.then(result => {
    console.log('::Postgres Sequelize Connected::');
    
})
.catch(error => {
    console.log('::Postgres Sequelize Connection Error::');
    
})

module.exports = app;
