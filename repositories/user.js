const User = require('../models/user');


exports.create = (username, email, password) => {
    return User.create({
        email: email,
        username: username,
        password: password
    })
}

exports.getUserByEmail = (email) => {
    return User.findOne({
        where: {
          email: email
        }
      });
}