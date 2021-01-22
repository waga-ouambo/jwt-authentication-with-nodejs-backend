const http = require('http');

const express = require('express'); 
const bodyParser = require('body-parser'); 
const authRoute = require('./routes/auth.route'); 
const postRoute = require('./routes/post.route');
const errorController = require('./controllers/error.controller') ;
const connectMongo = require('./helpers/database').connectMongo;
var geoip = require('geoip-lite');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'acces.log'), 
{flag: 'a'});


var ip = "154.72.150.233";
var geo = geoip.lookup(ip);

console.log(geo);

console.log("The IP is %s", geoip.pretty(ip));

const dotEnv = require('dotenv');
dotEnv.config();


const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json()); // express.json() === bodyParser.json()
// app.use(bodyParser.json());

app.use(helmet());
// var logger = morgan('combined', {stream: accessLogStream})

app.use(morgan('combined', {stream: accessLogStream}));

app.use((req, res, next) => {
    console.log("Browser: " + req.headers["user-agent"]);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, auth-token, agent, visitorId');
    next();
})


app.use('/api/user', authRoute);  
app.use('/api/post', postRoute);
app.use('/', postRoute); 

app.use(errorController.get404); 


 
// connectMongo(() => {
//     console.log('server started...');
//     app.listen(3000);
// })

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.irbia.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, 
    {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    console.log('connected to remote DB mongo !!!! ')
    console.log('server started...');
    app.listen(process.env.SERVER_PORT || 3000, () => { console.log('Server is running ' +process.env.SERVER_PORT+'...')});
})
.catch((error) => {
    console.log('Cannot connect to Database !'); 
    console.log(error); 
}); 
