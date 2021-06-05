const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {checkRegisterData, checkLoginDataGraphql, checkRegisterDataGraphql} = require('../middlewares/auth.middleware');
const authRoute = require('../controllers/auth.controller');

module.exports = {

    hello() {
        return {text: 'Hello World !', views: 10}
    }, 
    logino: async function({ email, password }, req) {
      checkLoginDataGraphql({ email, password})
        console.log(email);
        console.log(req.body);
        try{ 
            // Checking if the email user already exist
            const userExist = await User.findOne({email: email});
            if(!userExist) throw new Error('Email or password is wrong !') ; 
            
            // Checking if the password match
            const validPassword = await bcrypt.compare(password, userExist.password);
            if(!validPassword) throw new Error('Email or password is wrong !') ;
    
            //Create and assing token 
            const token = jwt.sign({_id: userExist._id, userName: userExist.userName}, process.env.SECRET_TOKEN, {  expiresIn : 60 });
            // res.header('auth-token', token).send(token); 
            return {
                token: token,
                userId: userExist._id
            }
         }
         catch(error){
             console.log(error);
            //  res.status(400).send(error);
             throw error;
         } 
     
    } ,

    createUser: async function({ userInput }, req) {
      checkRegisterDataGraphql(userInput)
     return await authRoute.postRegisterGraphql(userInput, req);
    } , 
    
    
  createUser2: async function({ userInput }, req) {
    //   const email = args.userInput.email;
    console.log(userInput)
    const errors = [];
    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: 'E-Mail is invalid.' });
    }
    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({ message: 'Password too short!' });
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error('User exists already!');
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },

  login: async function({ email, password }) {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error('User not found.');
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Password is incorrect.');
      error.code = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email
      },
      'somesupersecretsecret',
      { expiresIn: '1h' }
    );
    return { token: token, userId: user._id.toString() };
  },
  createPost: async function({ postInput }, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }
    const errors = [];
    if (
      validator.isEmpty(postInput.title) ||
      !validator.isLength(postInput.title, { min: 5 })
    ) {
      errors.push({ message: 'Title is invalid.' });
    }
    if (
      validator.isEmpty(postInput.content) ||
      !validator.isLength(postInput.content, { min: 5 })
    ) {
      errors.push({ message: 'Content is invalid.' });
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('Invalid user.');
      error.code = 401;
      throw error;
    }
    const post = new Post({
      title: postInput.title,
      content: postInput.content,
      imageUrl: postInput.imageUrl,
      creator: user
    });
    const createdPost = await post.save();
    user.posts.push(createdPost);
    return {
      ...createdPost._doc,
      _id: createdPost._id.toString(),
      createdAt: createdPost.createdAt.toISOString(),
      updatedAt: createdPost.updatedAt.toISOString()
    };
  }
};
