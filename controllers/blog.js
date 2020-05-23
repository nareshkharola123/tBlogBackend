const { validationResult } = require('express-validator');

const blog = require('../repositories/blog'); 


exports.getBlog = (req,res, next) => {
    blog.getBlog(req.params.id)
    .then(blog => {
        res.status(200).json({
            blog: blog,
            message: 'Get Blog Successful!'
        })
    })
    .catch(error => {
      res.status(422).json({
          error: error.message,
          message: 'Error while get blog!'
      })  
    })
}

exports.getBlogs = (req, res, next) => {
    blog.getBlogs()
    .then(blogs => {
        res.status(200).json({
            blogs: blogs,
            message: 'Get Blogs Successful'
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error.message,
            message: 'Error While Getting BlogCategory!'
        });
    });
}

exports.addBlogs = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

    blog.addBlogs(req.body)
    .then(result =>{
        console.log(result);
        res.status(201).json({
            'blog': result,
            message: 'Blog Created Successful!'
        })
        
    })
    .catch(error => {
        res.status(422).json({
            error: error.message,
            message: 'Error While adding Blog!'
        });
        
    })
    
}

exports.deleteBlog = (req, res, next) => {
    blog.deleteBlog(req.params.id)
    .then(result => {
        res.status(200).json({
            deleted: result,
            message: 'Blog successfully delete'
        })
    })
    .catch(error => {
        res.status(422).json({
            deleted: error,
            message: 'Error while deleting blog!'
        })
    })
}

exports.updateBlog = (req, res, next) => {
    
    blog.updateBlog(req.params.id, req.body)
    .then(blog => {
        
        console.log(blog);
        res.status(201).json({
            blog: blog,
            message: 'Blog Successfully Updated!' 
        })
    })
    .catch(error => {
        res.status(422).json({
            error: error,
            message: 'Error While updating Blog!'
        })
    })
}