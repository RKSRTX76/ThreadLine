import { StatusCodes } from "http-status-codes";

import { isMemberPartOfWorkService } from "../services/memberService.js"
import { customErrorResponse, internalServerError } from "../utils/common/errorResponse.js";
import { successResponse } from "../utils/common/successResponse.js";

export const isMemberPartOfWorkspaceController = async function(req , res) {
    try {
        const response = await isMemberPartOfWorkService(
            req.params.workspaceId,
            req.user
        );

        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, "User is a member of workspace"));
    } catch (error) {
        console.log("Member controller error", error);
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