// import {checkRegisterData} from '../middlewares/auth.middleware';
const express = require('express');

const route = express.Router();
 
const postRoute = require('../controllers/post.controller');

const {verifyToken} = require('../middlewares/auth.middleware');




route.get('/list', verifyToken, postRoute.getPost); 
route.get('/', postRoute.getPost);  

module.exports = route;
