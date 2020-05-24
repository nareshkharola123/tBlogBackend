const { validationResult } = require('express-validator');

const authServices = require('../services/auth');


exports.signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      
      try{
        const authService = await authServices.signUp(
            req.body.username,
            req.body.email,
            req.body.password
            );
        res.status(authService.status).json({
                    data: await authService.data,
                    message: authService.message
                });
    }catch(error){
        console.log(error);
        
        res.status(500).json({
            error: error,
            message: 'Internal Error!'
        });
    }   
}

exports.logIn = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
        
      try{
        const authService = await authServices.logIn(
            req.body.email,
            req.body.password
            );
        res.status(authService.status).json({
                    data: await authService.data,
                    message: authService.message
                });
    }catch(error){
        console.log(error);
        
        res.status(500).json({
            error: error,
            message: 'Internal Error!'
        });
    }   

}