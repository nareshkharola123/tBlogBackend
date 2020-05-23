const blog = require('../repositories/blog');


exports.getBlog = async (id) => {
    let blogData;
    let message;
    let blogError;
    let status;

    try{
        blogData = await blog.getBlog(id);
        message = 'Blog Get Successfully!';
        status = 200;
    }catch(error){
        blogError = error;
        message = 'Error Occur While Fetching Blog!';
        status = 422
    }
    
    return {
        data: blogData || blogError,
        message: message,
        status: status
    }
    
}

exports.getBlogs = async () => {
    let blogsData;
    let message;
    let blogError;
    let status;

    try{
        blogsData = await blog.getBlogs();
        message = 'Blogs Get Successfully!';
        status = 200;
    }catch(error){
        blogError = error;
        message = 'Error Occur While Fetching Blogs!';
        status = 422
    }
    
    return {
        data: blogsData || blogError,
        message: message,
        status: status
    }
}

exports.addBlog = async (data) => {
    let newBlogData;
    let message;
    let blogError;
    let status;

    try{
        newBlogData = await blog.addBlog(data);
        message = 'Blog Successfully Added!';
        status = 201;
    }catch(error){
        blogError = error;
        message = 'Error Occur While Adding Blog!';
        status = 422
    }
    
    return {
        data: newBlogData || blogError,
        message: message,
        status: status
    }
    
}

exports.deleteBlog = async (id) => {

    let deletedBlog;
    let message;
    let blogError;
    let status;

    try{
        deletedBlog = await blog.deleteBlog(id);
        message = 'Blog Successfully Deleted!';
        status = 200;
    }catch(error){
        blogError = error;
        message = 'Error Occur While Deleting Blog!';
        status = 422
    }
    
    return {
        data: deletedBlog || blogError,
        message: message,
        status: status
    }

}

exports.updateBlog = async (id, data) => {
    
    let updatedBlog;
    let message;
    let blogError;
    let status;

    try{
        updatedBlog = await blog.updateBlog(id,data);
        message = 'Blog Successfully Updated!';
        status = 200;
    }catch(error){
        blogError = error;
        message = 'Error Occur While Updating Blog!';
        status = 422
    }
    
    return {
        data: updatedBlog || blogError,
        message: message,
        status: status
    }

} 