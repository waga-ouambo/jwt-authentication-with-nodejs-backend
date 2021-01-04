const express = require('express');

const route = express.Router();

const authRoute = require('../controllers/auth.controller');

import { checkRegisterData } from "../middlewares/auth.middleware";


route.get('/login', authRoute.getLogin);
route.post('/login', authRoute.postLogin );
route.get('/register', authRoute.getRegister);
route.post('/register', checkRegisterData, authRoute.postRegister);

module.exports = route;
