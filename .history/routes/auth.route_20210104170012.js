// import {checkRegisterData} from '../middlewares/auth.middleware';
const express = require('express');

const route = express.Router();

const authRoute = require('../controllers/auth.controller');

const checkRegisterData = require('../middlewares/auth.middleware').checkRegisterData;




route.get('/login', authRoute.getLogin);
route.post('/login', authRoute.postLogin );
route.get('/register', authRoute.getRegister);
route.post('/register', checkRegisterData, authRoute.postRegister);

module.exports = route;
