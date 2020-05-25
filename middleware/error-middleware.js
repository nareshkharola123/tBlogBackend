const statusCode = require('../util/message-exception.json').status;


module.exports = (error, req, res, next) => {
    const status = error.status || statusCode.status_500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ 
        message: message, 
        data: data 
    });
  }