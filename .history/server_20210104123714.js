const http = require('http');

const express = require('express'); 
const bodyParser = require('body-parser'); 
const authRoute = require('./routes/auth.route'); 
const errorController = require('./controllers/error.controller') ;
const connectMongo = require('./helpers/database').connectMongo;

const dotEnv = require('dotenv');
dotEnv.config();


const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.json()); // express.json() === bodyParser.json()
app.use(bodyParser.json());


app.use('/api/user', authRoute);  

app.use(errorController.get404);
 
// connectMongo(() => {
//     console.log('server started...');
//     app.listen(3000);
// })

mongoose.connect(process.env.DB_CONNECT)
.then(result => {
    console.log('connected to remote DB mongo !!!! ')
    console.log('server started...');
    app.listen(3000, () => { console.log('Server is running ...')});
})
.catch((error) => {
    console.log(error); 
});

console.log('AAAAAAAAAAA !!!! ');