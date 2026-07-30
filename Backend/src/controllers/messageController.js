import { StatusCodes } from "http-status-codes";

import cloudinary from "../config/cloudinary.js";
import {
    CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_CLOUD_SECRET,
} from "../config/serverConfig.js";
import { getMessagesService } from "../services/messageService.js";
import { customErrorResponse, internalServerError } from "../utils/common/errorResponse.js";
import { successResponse } from "../utils/common/successResponse.js";

export const getMessagesController = async function(req , res) {
    try {
        const messages = await getMessagesService({
            channelId : req.params.channelId,
            // workspaceId : req.query.workspaceId
        },
        req.query.page || 1,
        req.query.limit || 20,
        req.user
    );

        return res
            .status(StatusCodes.OK)
            .json(successResponse(messages, "Messages fetched successfully"));
    } catch (error) {
        console.log("Message controller error", error);
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

export const getPaginatedUrlFromCloudinaryController = async (req, res)=>{
    try {
        const timestamp = Math.round(Date.now() / 1000);

    const paramsToSign = {
      timestamp,
      folder: "uploads", // Optional folder
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      CLOUDINARY_CLOUD_SECRET
    );

    return res.status(StatusCodes.OK).json(
      successResponse(
        {
          cloudName: CLOUDINARY_CLOUD_NAME,
          apiKey: CLOUDINARY_API_KEY,
          timestamp,
          folder: "uploads",
          signature,
        },
        "Upload signature generated successfully"
      )
    );
    } catch (error) {
        console.log("Error in getPresignedUrlFromCloudinary controller error", error);
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
