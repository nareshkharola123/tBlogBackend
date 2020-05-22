const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const blogs = require('../controllers/blog'); 


/* GET Blog. */
router.get('/blog/:id', blogs.getBlog);
/* GET Blogs. */
router.get('/blogs', blogs.getBlogs);
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

], blogs.addBlogs);
/* Delete Blog. */
router.delete('/blog/:id', blogs.deleteBlog);
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
]
 ,blogs.updateBlog);


module.exports = router;
