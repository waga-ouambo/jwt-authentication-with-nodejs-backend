// import { Request, Response, NextFunction } from 'express';
const joi = require('@hapi/joi'); 
const jwt = require('jsonwebtoken');


module.exports.checkRegisterData = (req, res, next) => {  

        let schema = joi.object().keys({
            email: joi.string().trim().required().lowercase().email(), 
            phoneNumber: joi.number().required().min(4),
            userName: joi.string().alphanum().trim().required(),
            password: joi.string().required().alphanum(),
            confirmPassword: joi.string().alphanum()
        });

        let {error} = joi.validate(req.body, schema);

        if(error){ 
            return   res.status(403).send(error.details[0].message);
        } 
        next();
}


module.exports.checkLoginData = (req, res, next) => {  

        let schema = joi.object().keys({
            email: joi.string().trim().required().lowercase().email(),  
            password: joi.string().required().min(4)
        }); 
        let {error} = joi.validate(req.body, schema);

        if(error){ 
            return   res.status(403).send(error.details[0].message);
        } 
        next();
}

module.exports.verifyToken = (req, res, next) => {  
         try{

            const token = req.header('auth-token');

            if(!token) return res.status(401).send('Access denied'); 
         
           console.log(process.env.SECRET_TOKEN);

                const verifyToken = jwt.verify(token, process.env.SECRET_TOKEN, { algorithms: ['HS256'], ignoreExpiration: false });
                req.user = verifyToken; 
                next();
         }
         catch (error){
            console.log('Invalid Token !');
            res.status(400).send('Invalid Token !');
         } 
       
}

// ============================================================================


module.exports.checkLoginDataGraphql = (inputData) => {  

    let schema = joi.object().keys({
        email: joi.string().trim().required().lowercase().email(),  
        password: joi.string().required().min(4)
    }); 
    let {error} = joi.validate(inputData, schema);

    if(error){  
        throw new Error(error.details[0].message);
    }  
}



module.exports.checkRegisterDataGraphql = (inputData) => {  

    let schema = joi.object().keys({
        email: joi.string().trim().required().lowercase().email(), 
        phoneNumber: joi.number().required().min(4),
        userName: joi.string().alphanum().trim().required(),
        password: joi.string().required().alphanum(),
        confirmPassword: joi.string().alphanum()
    });

    let {error} = joi.validate(inputData, schema);

    if(error){ 
         throw new Error(error.details[0].message);
    } 
}