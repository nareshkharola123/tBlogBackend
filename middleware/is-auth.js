const jwt = require('jsonwebtoken');

const secretData = require('../util/secret-data.json');
const statusCodes = require('../util/message-exception.json').status;
const exception_msg = require('../util/message-exception.json').exception_message;


module.exports = (req, res, next) => {
    
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error(exception_msg.not_auth);
    error.statusCode = statusCodes.status_401;
    throw error;
  }
  const token = authHeader;
  
  let decodedToken;
  
  try {
    decodedToken = jwt.verify(token, secretData.privateKey);
  } catch (err) {
    err.statusCode = statusCodes.status_500;
    throw err;
  }
  
  if (!decodedToken) {
    const error = new Error(exception_msg.not_auth);
    error.statusCode = statusCodes.status_401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};