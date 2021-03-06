const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');

const sequelize = require('./util/database-conf');
const blogRouter = require('./routes/blog');
const blogCategoryRouter = require('./routes/blog-category');
const BlogCategory = require('./models/blog-category');
const Blog = require('./models/blog');
const authRouter = require('./routes/auth');
const errorMiddleWare = require('./middleware/error-middleware');
const imageUpload = require('./middleware/image-upload');
const fileStorage = require('./middleware/imageCongFig').fileStorage;
const fileFilter = require('./middleware/imageCongFig').filtFilter;
const User = require('./models/user');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));


//config req. headers

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

// config req. headers end here

app.use(multer(imageUpload).single('imageUrl'))

// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single('imageUrl')
// );

// routes start from here
app.use('/api', blogRouter);
app.use('/api', blogCategoryRouter);
app.use('/api', authRouter)
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
Blog.belongsTo(User, {
  constraints: true, 
  onDelete: 'CASCADE',  
  foreignKey: {
  allowNull: false
  }
})
User.hasMany(Blog);
//model relationship end here

app.use(errorMiddleWare);

sequelize.sync()
.then(result => {
    console.log('::Postgres Sequelize Connected::');
    
})
.catch(error => {
    console.log('::Postgres Sequelize Connection Error::');
    
})

module.exports = app;
