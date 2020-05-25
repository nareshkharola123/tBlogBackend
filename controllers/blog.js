const { validationResult } = require('express-validator');

const blogServices = require('../services/blog'); 


exports.getBlog = async (req,res, next) => {

    try{
        const blogService = await blogServices.getBlog(req.params.id)
        res.status(blogService.status).json({
            data: await blogService.data,
            message: blogService.message
        });
    }catch(error){
        res.status(500).json({
            data: error,
            message: 'Internal Error!'
        });
    }
}

exports.getBlogs = async (req, res, next) => {

    try{
        const blogService = await blogServices.getBlogs();
        res.status(blogService.status).json({
            data: await blogService.data,
            message: blogService.message
        });
    }catch(error){
        res.status(500).json({
            data: error,
            message: 'Internal Error!'
        });
    }
}

exports.addBlog = async (req, res, next) => {
    console.log('controller hi');
    
    console.log(req.body);
    console.log(req.file);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

    try{
        const blogService = await blogServices.addBlog(req.body, req.file.path)
        res.status(blogService.status).json({
            data: await blogService.data,
            message: blogService.message
        });
    }catch(error){
        res.status(500).json({
            data: error,
            message: 'Internal Error!'
        });
    }
}

exports.deleteBlog = async (req, res, next) => {

    try{
        const blogService = await blogServices.deleteBlog(req.params.id)
        res.status(blogService.status).json({
            data: await blogService.data,
            message: blogService.message
        });
    }catch(error){
        res.status(500).json({
            data: error,
            message: 'Internal Error!'
        });
    }
}

exports.updateBlog = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

     try{
        const blogService = await blogServices.updateBlog(req.params.id, req.body)
        res.status(blogService.status).json({
            data: await blogService.data,
            message: blogService.message
        });
    }catch(error){
        res.status(500).json({
            data: error,
            message: 'Internal Error!'
        });
    }   
}