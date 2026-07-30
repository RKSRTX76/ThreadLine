import bcrypt from 'bcrypt';
import { StatusCodes } from "http-status-codes";

import { ENABLE_EMAIL_VERIFICATION } from '../config/serverConfig.js';
import { addEmailtoMailQueue } from '../producer/mailQueueProducer.js';
import { createUser, getByToken, getUserByEmail } from "../repository/userRepository.js";
import { createJWT } from "../utils/common/authUtils.js";
import { verifyEmail } from '../utils/common/mailObject.js';
import ClientError from "../utils/errors/ClientError.js";
import ValidationError from "../utils/errors/validationError.js";

export const signUpService = async(data)=>{
    try {
        const newUser = await createUser(data);
        if(ENABLE_EMAIL_VERIFICATION){
            addEmailtoMailQueue(
                {
                    ...verifyEmail(newUser.verificationToken),
                    to : newUser.email
                }
            )
        }
        return {
            username : newUser.username,
            avatar : newUser.avatar,
            email : newUser.email,
            _id : newUser._id,
            token : createJWT({
                id : newUser._id,
                email : newUser.email
            })
        };
    } catch (error) {
        console.error("Error in signUpService:", error); 
        if(error.name === "ValidationError"){
            throw new ValidationError(error.message, "Validation failed", StatusCodes.BAD_REQUEST);
        }
        if(error.code === 11000 || error.cause?.code === 11000){
            throw new ValidationError(
                error.keyValue || error.cause?.keyValue,
                "User with same email or username already exists",
                StatusCodes.CONFLICT
            );
        }
        throw error;
    }
}


export const verifyTokenService = async(token)=>{
    try {
        const user = await getByToken(token);
        if(!user){
            throw new ClientError({
                explanation : "Invalid data sent from the client",
                message : "Invalid token",
                statusCode : StatusCodes.BAD_REQUEST
            })
        }
        
        // check if the token has expired or not
        if(user.verificationTokenExpiry < Date.now()){
            throw new ClientError({
                explanation : 'Invalid data sent from the client',
                message : "Token has expired",
                statusCode : StatusCodes.BAD_REQUEST
            })
        }

        user.isVerified = true;
        user.verificationToken = null;
        user.verificationTokenExpiry = null;

        await user.save();

        return user;
        
    } catch (error) {
        console.error("User service error:", error); 
        throw error;
    }
}



export const signInService = async(data)=>{
    try {
        const user = await getUserByEmail(data.email);
        
        if(!user){
            throw new ClientError({
                explanation : "Invalid email/username or password",
                message : "User does not exist",
                statusCode : StatusCodes.NOT_FOUND
            })
        }
        const isMatch = bcrypt.compareSync(data.password, user.password);
        if(!isMatch){
            throw new ClientError({
                explanation : "Invalid email/username or password",
                message : "Incorrect password, try again",
                statusCode : StatusCodes.BAD_REQUEST
            })
        }
        return {
            username : user.username,
            avatar : user.avatar,
            email : user.email,
            _id : user._id,
            token : createJWT({
                id : user._id,
                email : user.email
            })
        };
    } catch (error) {
        console.error("User service error", error); 
        throw error;
    }
}