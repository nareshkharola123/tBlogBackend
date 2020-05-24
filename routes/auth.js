const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const auth = require('../controllers/auth');


//  /api/signup => POST
router.post('/signup',[
    body('username')
      .trim()
      .not()
      .isEmpty(),
      body('password')
      .trim()
      .isLength({ min: 5 }),
      body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
],auth.signUp);
//  /api/logIn => POST
router.post('/login',[
    body('email')
      .trim()
      .not()
      .isEmpty(),
      body('password')
      .trim(),
], auth.logIn)


module.exports = router;