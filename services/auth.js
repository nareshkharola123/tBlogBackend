const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = require('../repositories/user');
const secretData = require('../util/secret-data.json');
const sendMail = require('../util/send-mail');
const statusCode = require('../util/message-exception.json').status;
const success_msg = require('../util/message-exception.json').message;
const exception_msg = require('../util/message-exception.json').exception_message;


exports.signUp = async (username, email, password) => {
    let newUserData;
    let message;
    let userError;
    let status;

    const checkUserExist = await user.getUserByEmail(email);
    if(checkUserExist){
        message = exception_msg.user_exist,
        status = statusCode.status_422

    }else{
        const encryptPassword = await bcrypt.hash(password, 12)
        try{
            newUserData = await user.create(username, email, encryptPassword);
            message = success_msg.signUp_successful;
            status = statusCode.status_201;

            // sending mail
            try{
            const mail = await sendMail(email);
            }catch(error){
                console.info(error);  
            }
            
        }catch(error){
            userError = error;
            message = exception_msg.signUp_error,
            status = statusCode.status_422
        }
    }

    return {
        data: newUserData || userError,
        message: message,
        status: status
    }
}

exports.logIn = async (email, password) => {
    let userData;
    let message;
    let userError;
    let status;

    const checkUserExist = await user.getUserByEmail(email)
    
    if(!checkUserExist){
        message = exception_msg.user_not_exist,
        status = statusCode.status_422

    }else{
        try{
            const isValidPassword = await bcrypt.compare(password, checkUserExist.password);
            
            if(isValidPassword){
                const token = jwt.sign(
                    {
                      email: checkUserExist.email,
                      userId: checkUserExist.id.toString()
                    },
                    secretData.privateKey,
                    { expiresIn: '1h' }
                  );
                userData = token;
                message = success_msg.logIn_successful;
                status = statusCode.status_200;
            }else{
                message = exception_msg.credentials_error;
                status = statusCode.status_401;
            }
        }catch(error){
            userError = error;
            message = exception_msg.login_error;
            status = statusCode.status_422
        }
    }

    return {
        data: userData || userError,
        message: message,
        status: status
    }
}