import { Request, Response, NextFunction } from 'express';
const joi = require('@hapi/joi');


export const checkRegisterData = (req: Request, res: Response, next: NextFunction) => {

        let schema = joi.object().keys({
            email: joi.string().require(),
            password: joi.string().require(),
            phoneNumber: joi.string().require(),
            userName: joi.string().require()
        })

        if(joi.validate(Request.body, schema)){
            
        }
        return joi.validate(Request.body, schema); 
 
}