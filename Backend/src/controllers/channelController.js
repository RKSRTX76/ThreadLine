import { StatusCodes } from "http-status-codes";

import { getChannelByIdService } from "../services/channelService.js"
import { customErrorResponse, internalServerError } from "../utils/common/errorResponse.js";
import { successResponse } from "../utils/common/successResponse.js";

export const getChannelByIdController = async(req , res)=>{
    try {
        const response = await getChannelByIdService(
            req.params.channelId,
            req.user
        );
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, 'Channel fetched successfully'));
    } catch (error) {
        console.log('Get channel by id controller error', error);
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