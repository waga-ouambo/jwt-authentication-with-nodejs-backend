// import { Request, Response, NextFunction } from 'express';
const joi = require('@hapi/joi'); 

let schema = joi.object().keys({
    email: joi.string().required().email(), 
    phoneNumber: joi.string().required().min(4),
    userName: joi.string().required(),
    password: joi.string().required()
})

module.exports.checkRegisterData = (req, res, next) => {  

        let {error} = joi.validate(req.body, schema);

        if(error){ 
            return   res.status(403).send(error.details[0].message);
        } 
        next();
}