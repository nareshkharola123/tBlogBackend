const jwt = require('jsonwebtoken');

const secretData = require('../util/secret-data.json');

module.exports = (req, res, next) => {
    
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader;
  
  let decodedToken;
  
  try {
    decodedToken = jwt.verify(token, secretData.privateKey);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  
  if (!decodedToken) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};