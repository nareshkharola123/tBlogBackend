const blogCategory = require('../repositories/blog-category');


exports.getBlogCategory = async (blogCategoryId) => {
    let blogCategoryData;
    let message;
    let blogCategoryError;
    let status;

    try{
        blogCategoryData = await blogCategory.getBlogCategory(blogCategoryId);
        message = 'BlogCategory Get Successfully!';
        status = 200;
    }catch(error){
        blogCategoryError = error;
        message = 'Error Occur While Fetching BlogCategory!';
        status = 422
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
        message = 'BlogCategories Data Fetched Successfully!';
        status = 200
    }
    catch(error){
        blogCategoryError = error
        message = 'Error While Fetching BlogCategories Data!';
        status = 422
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
         message = 'New BlogCategory added!';
         status = 201;
     }catch(error){
         blogCategoryError = error;
         message = 'Error While Adding New BlogCategory!',
         status = 422
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
         message = 'BlogCategory Successfully Updated!',
         status = 201

     }catch(error){
        blogCategoryError = error;
        message = 'Error while Updating BlogCategory!';
        status = 422
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
        message = 'BlogCategory Successfully Deleted!',
        status = 200

    }catch(error){
       blogCategoryError = error;
       message = 'Error while Deleting BlogCategory!';
       status = 422
    }

    return {
        data: deletedBlogCategory || blogCategoryError,
        message: message,
        status: status
    }

 }