const { validationResult } = require('express-validator');

const blogCategory = require('../repositories/blog-category');
const blogCategoryServices = require('../services/blog-category');


exports.getBlogCategory = async (req, res, next) => {
    try{
        const blogCategoryService = await blogCategoryServices.getBlogCategory(req.params.id)
        res.status(blogCategoryService.status).json({
            data: await blogCategoryService.data,
            message: blogCategoryService.message
        });
    }catch(error){
        res.status(500).json({
            data: error,
            message: 'Internal Error!'
        });
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
        res.status(500).json({
            error: error,
            message: 'Internal Error!'
        });
    } 
}

exports.addBlogCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      try{
        const blogCategoriesService = await blogCategoryServices.addBlogCategory(req.body.title);
        res.status(blogCategoriesService.status).json({
                    data: await blogCategoriesService.data,
                    message: blogCategoriesService.message
                });
    }catch(error){
        res.status(500).json({
            error: error,
            message: 'Internal Error!'
        });
    }  
}

exports.updateBlogCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

    try{
        const blogCategoriesService = await blogCategoryServices.updateBlogCategory(req.body);
        res.status(blogCategoriesService.status).json({
                    data: await blogCategoriesService.data,
                    message: blogCategoriesService.message
                });
    }catch(error){
        res.status(500).json({
            error: error,
            message: 'Internal Error!'
        });
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
        res.status(500).json({
            error: error,
            message: 'Internal Error!'
        });
    }
}