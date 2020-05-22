const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const blogCategory = require('../controllers/blog-category');

// /api/blogCategory => GET
router.get('/blog-category/:id', blogCategory.getBlogCategory);
// /api/blogCategories => GET
router.get('/blog-categories', blogCategory.getBlogCategories);
// /api/add-blogCategory => POST
router.post('/add-blog-category', [
    body('title')
    .not().isEmpty()
    .trim()
    .escape(),
],blogCategory.addBlogCategory);
// /api/update-blogCategory => PATCH
router.patch('/update-blog-category/:id',[
    body('title')
    .not().isEmpty()
    .trim()
    .escape(),
    body('id')
    .not().isEmpty()
    .trim()
    .escape(),
    ],
    blogCategory.updateBlogCategory);
/* Delete Blog. */
router.delete('/blog-category/:id', blogCategory.deleteBlogCategory);

module.exports = router;