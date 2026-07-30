import bcrypt from "bcrypt";
import mongoose from "mongoose";
import {v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : [true, "Email already exist"],
        match : [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address"
        ]
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        // in zod we handled regex for password
    },
    username : {
        type : String,
        required : [true, "Username is required"],
        unique : [true, "Username already exists"],
        match : [
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores."
        ]
    },
    avatar : {
        type : String
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    verificationToken : {
        type : String
    },
    verificationTokenExpiry : {
        type : Date
    }
}, {timestamps : true });


userSchema.pre('save', function saveUser(){
    const user = this;
    // 
    if(user.isModified('password')){
        const SALT = bcrypt.genSaltSync(9);
        const hashedPassword = bcrypt.hashSync(user.password, SALT);
        user.password = hashedPassword;
    }
   
    if(user.isNew){
        user.avatar = `https://robohash.org/${user.username}`;
        user.verificationToken = uuidv4().substring(0,10).toUpperCase();
        user.verificationTokenExpiry = Date.now() + 3600000; // 1 hr
    }
    
    // next();
});

const User = mongoose.model('User', userSchema);

export default User;
