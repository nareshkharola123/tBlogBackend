const Blog = require('../models/blog');


exports.getBlog = (id) => {
    return Blog.findByPk(id);
}

exports.getBlogs = () => {
    return Blog.findAll();
}

exports.addBlog = (blog,file) => {
        return Blog.create({
            title: blog.title,
            description: blog.description,
            imageUrl: file,
            blogCategoryId: blog.blogCategoryId
        })
}

exports.deleteBlog = (id) => {
    return Blog.destroy({
        where: {
            id: id
        }
    })
}

exports.updateBlog = async (blogId, blogData) => {
    Blog.findByPk(blogId)
    .then(blog => {
        blog.title = blogData.title;
        blog.description = blogData.description;
        blog.imageUrl = blogData.imageUrl;
        blog.blogCategoryId = blogData.blogCategoryId;
        return blog.save();
    })
    .catch(error => {
        console.log(error);
        
        return error;
    })  
}