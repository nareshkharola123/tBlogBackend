const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const blogs = require('../controllers/blog');
const checkAuth = require('../middleware/is-auth');


/* GET Blog. */
router.get('/blog/:id', checkAuth, blogs.getBlog);
/* GET Blogs. */
router.get('/blogs', checkAuth, blogs.getBlogs);
/* post Blog. */
router.post('/add-blog', [
    body('blogCategoryId')
    .not().isEmpty()
    .trim()
    .escape(),
    body('title')
    .not().isEmpty()
    .trim()
    .escape(),
    body('imageUrl')
    .not().isEmpty()
    .trim()
    .escape(),
    body('description')
    .trim()
    .escape(),

], checkAuth, blogs.addBlog);
/* Delete Blog. */
router.delete('/blog/:id', checkAuth, blogs.deleteBlog);
/* edit Blog. */
router.put('/blog/:id',[
    body('blogCategoryId')
    .not().isEmpty()
    .trim()
    .escape(),
    body('title')
    .not().isEmpty()
    .trim()
    .escape(),
    body('imageUrl')
    .not().isEmpty()
    .trim()
    .escape(),
    body('description')
    .not().isEmpty()
    .trim()
    .escape(),
], checkAuth, blogs.updateBlog);


module.exports = router;
