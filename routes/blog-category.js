const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const blogCategory = require('../controllers/blog-category');

// /api/blogCategory => GET
router.get('/blogCategory/:id', blogCategory.getBlogCategory);
// /api/blogCategories => GET
router.get('/blogCategories', blogCategory.getBlogCategories);
// /api/add-blogCategory => POST
router.post('/add-blogCategory', [
    body('title')
    .not().isEmpty()
    .trim()
    .escape(),
],blogCategory.addBlogCategory);
// /api/update-blogCategory => PATCH
router.patch('/update-blogCategory/:id',[
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

module.exports = router;