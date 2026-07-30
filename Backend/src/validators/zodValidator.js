import { StatusCodes } from "http-status-codes";

import { customErrorResponse } from "../utils/common/errorResponse.js";
import ValidationError from "../utils/errors/validationError.js";


export const validate = (schema) =>{
    return async(req, res, next) =>{
        try{
            await schema.parseAsync(req.body);
            next();
        }catch(error){
            console.log("Validation failed in zod validator", error.message);

            const validationError = new ValidationError(
                error.issues ?? error.message,
                "Validation failed",
                StatusCodes.BAD_REQUEST
            );

            return res
            .status(validationError.statusCode)
            .json(customErrorResponse(validationError));
        }
    }
}

