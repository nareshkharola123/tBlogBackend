const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = require('../repositories/user');
const secretData = require('../util/secret-data.json');
const sendMail = require('../util/send-mail');


exports.signUp = async (username, email, password) => {
    let newUserData;
    let message;
    let userError;
    let status;

    const checkUserExist = await user.getUserByEmail(email);
    if(checkUserExist){
        message = 'User Already Exist!',
        status = 422

    }else{
        const encryptPassword = await bcrypt.hash(password, 12)
        try{
            newUserData = await user.create(username, email, encryptPassword);
            message = 'User Successfully SignUp!';
            status = 201;

            // sending mail
            try{
            const mail = await sendMail(email);
            }catch(error){
                console.log("::Error While Sending Mail!");
                
            }
            
        }catch(error){
            userError = error;
            message = 'Error Occur While SignUp!';
            status = 422
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
    
    if(checkUserExist){
        message = 'User Not Exist!',
        status = 422

    }else{
        try{
            const isValidPassword = await bcrypt.compare(password, checkUserExist.password);
            console.log('service,', isValidPassword);
            
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
                message = 'User Successfully Logged!';
                status = 200;
            }else{
                message = 'Please Check Email Or Password!';
                status = 401;
            }
        }catch(error){
            console.log(error);
            
            userError = error;
            message = 'Error Occur While Login!';
            status = 422
        }
    }

    return {
        data: userData || userError,
        message: message,
        status: status
    }
}