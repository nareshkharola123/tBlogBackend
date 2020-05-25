const { validationResult } = require('express-validator');

const authServices = require('../services/auth');
const statusCode = require('../util/message-exception.json').status;


exports.signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(statusCode.status_422).json({ errors: errors.array() });
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
        next(error);
    }   
}

exports.logIn = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(statusCode.status_422).json({ errors: errors.array() });
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
        next(error);
    }   

}