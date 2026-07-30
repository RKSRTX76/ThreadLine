import { StatusCodes } from "http-status-codes";

import { signInService, signUpService } from "../services/userService.js";
import { customErrorResponse, internalServerError } from "../utils/common/errorResponse.js";
import { successResponse } from "../utils/common/successResponse.js";


export const signUp = async(req, res)=>{
    try {
        const user = await signUpService(req.body);
        return res
        .status(StatusCodes.CREATED)
        .json(successResponse(user, "User created successfully"))
    } catch (error) {
        console.log("User controller error", error);
        if(error.statusCode){
            return res
            .status(error.statusCode)
            .json(customErrorResponse(error));
        }
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalServerError(error));
    }
}

export const signIn = async(req, res)=>{
    try {
        const user = await signInService(req.body);
        return res
        .status(StatusCodes.OK)
        .json(successResponse(user, "User signed in successfully"))
    } catch (error) {
        console.log("User controller error", error);
        if(error.statusCode){
            return res
            .status(error.statusCode)
            .json(customErrorResponse(error));
        }
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalServerError(error));
    }
}