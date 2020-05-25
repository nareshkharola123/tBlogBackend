const { validationResult } = require('express-validator');

const blogServices = require('../services/blog');
const statusCode = require('../util/message-exception.json').status;


exports.getBlog = async (req,res, next) => {

    try{
        const blogService = await blogServices.getBlog(req.params.id)
        res.status(blogService.status).json({
            data: await blogService.data,
            message: blogService.message
        });
    }catch(error){
        next(error);
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
        next(error);
    }
}

exports.addBlog = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(statusCode.status_422).json({ errors: errors.array() });
      }

    try{
        const blogService = await blogServices.addBlog(req.body, req.file.location);
        res.status(blogService.status).json({
            data: await blogService.data,
            message: blogService.message
        });
    }catch(error){
       next(error);
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
        next(error);
    }
}

exports.updateBlog = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(statusCode.status_422).json({ errors: errors.array() });
      }
      
     try{
        const blogService = await blogServices.updateBlog(req.params.id, req.body, req.file.location)
        res.status(blogService.status).json({
            data: await blogService.data,
            message: blogService.message
        });
    }catch(error){
        next(error);
    }   
}