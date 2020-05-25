const { validationResult } = require('express-validator');

const blogCategoryServices = require('../services/blog-category');
const statusCode = require('../util/message-exception.json').status;


exports.getBlogCategory = async (req, res, next) => {
    try{
        const blogCategoryService = await blogCategoryServices.getBlogCategory(req.params.id);
        res.status(blogCategoryService.status).json({
            data: await blogCategoryService.data,
            message: blogCategoryService.message
        });
    }catch(error){
        next(error);
    }
}

exports.getBlogCategories = async (req, res, next) => {
    try{
        const blogCategoriesService = await blogCategoryServices.getBlogCategories();
        res.status(blogCategoriesService.status).json({
                    data: await blogCategoriesService.data,
                    message: blogCategoriesService.message
                });
    }catch(error){
        next(error);
    } 
}

exports.addBlogCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(statusCode.status_422).json({ errors: errors.array() });
      }

      try{
        const blogCategoriesService = await blogCategoryServices.addBlogCategory(req.body.title);
        res.status(blogCategoriesService.status).json({
                    data: await blogCategoriesService.data,
                    message: blogCategoriesService.message
                });
    }catch(error){
        next(error);
    }  
}

exports.updateBlogCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(statusCode.status_422).json({ errors: errors.array() });
      }

    try{
        const blogCategoriesService = await blogCategoryServices.updateBlogCategory(req.body);
        res.status(blogCategoriesService.status).json({
                    data: await blogCategoriesService.data,
                    message: blogCategoriesService.message
                });
    }catch(error){
        next(error);
    }
}

exports.deleteBlogCategory = async (req, res, next) => {

    try{
        const blogCategoriesService = await blogCategoryServices.deleteBlogCategory(req.params.id);
        res.status(blogCategoriesService.status).json({
                    data: await blogCategoriesService.data,
                    message: blogCategoriesService.message
                });
    }catch(error){
        next(error);
    }
}