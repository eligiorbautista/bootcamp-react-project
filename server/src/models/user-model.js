const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
 
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLength: 6
       
    },
    registrationDate : {
        type : Date,
        required : true,
        default : Date.now
    }
}, {versionKey: false})

// Decrypt password before saving
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(12);
        const encryptedPassword = await bcrypt.hash(this.password, salt);
        this.password = encryptedPassword;
        next();
    }
    catch (err){
        next(err);
    }
    
});
 

module.exports = mongoose.model('User', userSchema);