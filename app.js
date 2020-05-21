var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Sequelize = require('sequelize');

const sequelize = require('./util/database-conf');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const BlogCategory = require('./models/blog-category');
const Blog = require('./models/blog');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//model relationship start here

Blog.belongsTo(BlogCategory, { constraints: true, onDelete: 'CASCADE' });
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
