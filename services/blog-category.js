const blogCategory = require('../repositories/blog-category');
const statusCode = require('../util/message-exception.json').status;
const success_msg = require('../util/message-exception.json').message;
const exception_msg = require('../util/message-exception.json').exception_message;


exports.getBlogCategory = async (blogCategoryId) => {
    let blogCategoryData;
    let message;
    let blogCategoryError;
    let status;

    try{
        blogCategoryData = await blogCategory.getBlogCategory(blogCategoryId);
        if(!blogCategoryData){
            message = exception_msg.not_found;
            status = statusCode.status_422;
        }else{
            message = success_msg.get_success;
            status = statusCode.status_200;
        }
    }catch(error){
        blogCategoryError = error;
        message = exception_msg.get_error;
        status = statusCode.status_422;
    }

    return {
        data: blogCategoryData || blogCategoryError,
        message: message,
        status: status
    }
}

exports.getBlogCategories = async () => {
    let blogCategoriesData;
    let message;
    let blogCategoryError;
    let status;

    try{
        blogCategoriesData = await blogCategory.getBlogCategories();
        message = success_msg.get_success;
        status = statusCode.status_200;
    }
    catch(error){
        blogCategoryError = error;
        message = exception_msg.get_error;
        status = statusCode.status_422;
    }

    return {
        data: blogCategoriesData || blogCategoryError,
        message: message,
        status: status
    }
 }

 exports.addBlogCategory = async (title) => {
     let newBlogCategory;
     let message;
     let blogCategoryError;
     let status;

     try{ 
         newBlogCategory = await blogCategory.addBlogCategory(title);
         message = success_msg.post_success;
         status = statusCode.status_201;
     }catch(error){
         blogCategoryError = error;
         message = exception_msg.post_error;
         status = statusCode.status_422;
     }

     return {
         data: newBlogCategory || blogCategoryError,
         message: message,
         status: status
     }
 }

 exports.updateBlogCategory = async (data) => {
     let updatedBlogCategory;
     let message;
     let blogCategoryError;
     let status;

     try{
         updatedBlogCategory = await blogCategory.updateBlogCategory(data);
         message = success_msg.put_success;
         status = statusCode.status_201;

     }catch(error){
        blogCategoryError = error;
        message = exception_msg.put_error;
        status = statusCode.status_422;
     }

     return {
         data: updatedBlogCategory || blogCategoryError,
         message: message,
         status: status
     }
 }

 exports.deleteBlogCategory = async (id) => {
    let deletedBlogCategory;
    let message;
    let blogCategoryError;
    let status;

    try{
        deletedBlogCategory = await blogCategory.deleteBlogCategory(id);
        message = success_msg.delete_success;
        status = statusCode.status_200;

    }catch(error){
       blogCategoryError = error;
       message = exception_msg.delete_error;
       status = statusCode.status_422;
    }

    return {
        data: deletedBlogCategory || blogCategoryError,
        message: message,
        status: status
    }

 }