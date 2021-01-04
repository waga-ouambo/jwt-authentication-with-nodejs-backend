// import { Request, Response, NextFunction } from 'express';
const joi = require('@hapi/joi'); 

module.exports.checkRegisterData = (req, res, next) => { 
        let schema = joi.object().keys({
            email: joi.string().required().email(),
            password: joi.string().require(),
            phoneNumber: joi.string().required().min(4),
            userName: joi.string().required()
        })

        let {error} = joi.validate(Request.body, schema);

        if(error){ 
            res.status(403).send(error.details[0].message);
        } 
        next();
}