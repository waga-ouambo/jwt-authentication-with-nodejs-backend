import { Request, Response, NextFunction } from 'express';
const joi = require('@hapi/joi');


export const checkRegisterData = (req: Request, res: Response, next: NextFunction) => { 
        let schema = joi.object().keys({
            email: joi.string().require().email(),
            password: joi.string().require(),
            phoneNumber: joi.string().require(),
            userName: joi.string().require()
        })

        let {error} = joi.validate(Request.body, schema);

        if(error){ 
            res.status(403).send(error.details[0].message);
        } 
        next();
}