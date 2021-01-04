
const User = require('../models/user.model');


exports.getRegister = (req, res, next) => {
    console.log(' Signup Page !')
    res.status(404).send('<h1> Hello from Register Page !</h1>');
} ;

exports.getLogin = (req, res, next) => {
    console.log(' Login Page !')
    res.status(404).send('<h1> Hello from Login Page !</h1>');
} ;

exports.postRegister = async (req, res, next) => {
console.log(req.body.email);
    const user = new User({
        email: req.body.email,
        userName: req.body.userName,
        phoneNumber: req.body.phoneNumber 
    });

    try{ 
       const usr = await user.save();
       res.status(401).send(usr); 
    }
    catch(error){
        console.log(error);
        throw error;
    }

    // console.log(' Signup Page !')
    // res.status(404).send('<h1> Hello from Register Page !</h1>');
} ;

exports.postLogin = (req, res, next) => {
    console.log(' Login Page !')
    res.status(404).send('<h1> Hello from Login Page !</h1>');
} ;