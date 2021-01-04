const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        min : 4,
        max : 40
    },
    password : {
        type: String,
        require: false,
        max: 1028
    },
    phoneNumber : { 
        type: Number,
        require: true
    },
    userName:  {
        type: String,
        require: true
    },
    createDt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', userSchema);