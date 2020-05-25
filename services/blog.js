const blog = require('../repositories/blog');
const statusCode = require('../util/message-exception.json').status;
const success_msg = require('../util/message-exception.json').message;
const exception_msg = require('../util/message-exception.json').exception_message;


exports.getBlog = async (id) => {
    let blogData;
    let message;
    let blogError;
    let status;

    try{
        blogData = await blog.getBlog(id);
        if(!blogData){
            message = exception_msg.not_found;
            status = statusCode.status_422;
        }else{
        message = success_msg.get_success;
        status = statusCode.status_200;
        }
    }catch(error){
        blogError = error;
        message = exception_msg.get_error;
        status = statusCode.status_422;
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
        if(!blogsData){
            message = exception_msg.not_found;
            status = statusCode.status_422;
        }else{
            message = success_msg.get_success;
            status = statusCode.status_200;
        }
    }catch(error){
        blogError = error;
        message = exception_msg.get_error;
        status = statusCode.status_422;
    }
    
    return {
        data: blogsData || blogError,
        message: message,
        status: status
    }
}

exports.addBlog = async (data, file) => {
    let newBlogData;
    let message;
    let blogError;
    let status;

    try{
        newBlogData = await blog.addBlog(data, file);
        message = success_msg.post_success;
        status = statusCode.status_201;
    }catch(error){
        blogError = error;
        message = exception_msg.post_error;
        status = statusCode.status_422;
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
        message = success_msg.delete_success;
        status = statusCode.status_200;
    }catch(error){
        blogError = error;
        message =  exception_msg.delete_error;
        status = statusCode.status_422;
    }
    
    return {
        data: deletedBlog || blogError,
        message: message,
        status: status
    }

}

exports.updateBlog = async (id, data, file) => {
    
    let updatedBlog;
    let message;
    let blogError;
    let status;

    try{
        updatedBlog = await blog.updateBlog(id,data, file);
        message = success_msg.put_success;
        status = statusCode.status_201;
    }catch(error){
        blogError = error;
        message = exception_msg.put_error;
        status = statusCode.status_422;
    }
    
    return {
        data: updatedBlog || blogError,
        message: message,
        status: status
    }

} 