const BlogCategory = require('../models/blog-category');


exports.getBlogCategory = (id) => {
    return BlogCategory.findByPk(id);
}

exports.getBlogCategories = () => {
    return BlogCategory.findAll();
}

exports.addBlogCategory = (blogCategory) => {
    return BlogCategory.create({
        title: blogCategory
    });
}

exports.updateBlogCategory = (blogCategory) => {
    return BlogCategory.update(
        {title: blogCategory},
        {
            where: {
                id: blogCategory.id
            }
        }
        );
}