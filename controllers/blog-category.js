const { validationResult } = require('express-validator');

const blogCategory = require('../repositories/blog-category');


exports.getBlogCategory = (req, res, next) => {
    blogCategory.getBlogCategory(req.params.id)
    .then(result => {
        res.status(200).json({
            blogs: result,
            message: 'Get BlogCategory Successful'
        })
        
    })
    .catch(error => {
        console.log(error);
        
        res.status(422).json({
            error: error.message,
            message: 'Error While Getting BlogCategory!'
        });
    })   
}

exports.getBlogCategories = (req, res, next) => {
    blogCategory.getBlogCategories()
    .then(result => {
        res.status(200).json({
            blogs: result,
            message: 'List Of Blogs'
        })
        
    })
    .catch(error => {
        res.status(500).json({
            error: error,
            message: 'Error While Getting BlogCategory'
        });
    })
    
}

exports.addBlogCategory = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
    
    blogCategory.addBlogCategory(req.body.title)
    .then(result => {    
        res.status(201).json({
            message: 'BlogCategory added Successful!',
            blogCategory: result
        });
    })
    .catch(error => {
        res.status(422).json({
            message: 'BlogCategory Must Be Unique!',
            blogCategory: error.message
        });
    })   
}

exports.updateBlogCategory = (req, res, next) => {
    console.log(req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      blogCategory.updateBlogCategory(req.body)
      .then(result => {
        res.status(201).json({
            blogCategory: result,
            message: 'BlogCategory Updated!'
        });
      })
      .catch(error => {
          console.log();
          res.status(422).json({
            message: 'BlogCategory Must Be Unique',
            blogCategory: error.message
        })
      })
}

exports.deleteBlogCategory = (req, res, next) => {
    blogCategory.deleteBlogCategory(req.params.id)
    .then(blogCategory => {
        res.status(200).json({
            deleted: blogCategory,
            message: 'BlogCategory Successfully Deleted!'
        })
    })
    .catch(error => {
        res.status(422).json({
            error: error,
            message: 'Getting Error While Deleting BlogCategory!'
        })
    })
}