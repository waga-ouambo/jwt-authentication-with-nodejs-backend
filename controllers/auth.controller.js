
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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

    // Checking if the email user already exist
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email alreasy exist !');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        userName: req.body.userName,
        phoneNumber: req.body.phoneNumber, 
        password: hashPassword 
    });

    try{ 
       const usr = await user.save();
       return res.status(401).send(usr); 
    }
    catch(error){
        console.log(error);
        res.status(400).send(error);
        throw error;
    }

    // console.log(' Signup Page !')
    // res.status(404).send('<h1> Hello from Register Page !</h1>');
} ;

exports.postLogin = async (req, res, next) => {

    try{ 
        // Checking if the email user already exist
        const userExist = await User.findOne({email: req.body.email});
        if(!userExist) return res.status(400).send('Email or password is wrong !'); 
        
        // Checking if the password match
        const validPassword = await bcrypt.compare(req.body.password, userExist.password);
        if(!validPassword) return res.status(400).send('Email or password is wrong !');

        //Create and assing token 
        const token = jwt.sign({_id: userExist._id, userName: userExist.userName}, process.env.SECRET_TOKEN);
        res.header('auth-token', token).send(token); 
     }
     catch(error){
         console.log(error);
         res.status(400).send(error);
         throw error;
     }

    
 
} ;
