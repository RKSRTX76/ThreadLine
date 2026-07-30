import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from "../config/serverConfig.js";
import { getUserById } from "../repository/userRepository.js";
import { customErrorResponse, internalServerError } from "../utils/common/errorResponse.js";

export const isAuthenticated = async(req , res , next) =>{
    try {
        const token = req.headers['x-access-token'];
        if(!token){
            return res
            .status(StatusCodes.FORBIDDEN)
            .json(
                customErrorResponse({
                    explanation : "Invalid data sent from client",
                    message : "No auth token provided"
                })
            )
        }

        const response = jwt.verify(token, JWT_SECRET);
        if(!response){
            return res
            .status(StatusCodes.FORBIDDEN)
            .json(
                customErrorResponse({
                    explanation : "Invalid data sent from client",
                    message : "Invalid token provided"
                })
            )
        }
        // valid token
        const user = await getUserById(response.id);
        req.user = user.id;
        next();
        
    } catch (error) {
        console.log("Auth middleware error", error);
        if(error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError'){
            return res.status(StatusCodes.FORBIDDEN).json(
                customErrorResponse({
                    explanation : "Invalid or expired auth token sent from client",
                    message : "Invalid or expired auth token provided"
                })
            )
        }

        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            internalServerError(error)
        )
    }


}

export default isAuthenticated;