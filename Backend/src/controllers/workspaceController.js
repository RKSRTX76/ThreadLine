import { StatusCodes } from "http-status-codes";

import { verifyTokenService } from "../services/userService.js";
import { addChannelToWorkSpaceService, addMemberToWorkSpaceService, createWorkspaceService, deleteWorkspaceService, getWorkspaceByJoinCodeService, getWorkspaceService, getWorkspaceUserIsMemberOfService, joinWorkspaceByCodeService, resetWorkspaceJoinCodeService, updateWorkspaceService } from "../services/workspaceService.js"
import { customErrorResponse, internalServerError } from "../utils/common/errorResponse.js";
import { successResponse } from "../utils/common/successResponse.js";

export const createWorkspaceController = async (req, res) => {
    try {
        const workspace = await createWorkspaceService({
            ...req.body,
            owner : req.user
        });
        return res
        .status(StatusCodes.CREATED)
        .json(successResponse(workspace, "Workspace created successfully"));
    } catch (error) {
        console.log(error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError(error));
    }
};

export const getWorkspaceUserIsMemberOfController = async (req, res) => {
    try {
        const response = await getWorkspaceUserIsMemberOfService(req.user);
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, "Workspace fetched successfully"));
    } catch (error) {
        console.log(error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError(error));
    }
};

export const deleteWorkSpaceController = async(req , res )=>{
    try {
        const response = await deleteWorkspaceService(
            req.params.workspaceId,
            req.user
        )
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, 'Workspace deleted successfully'));
    } catch (error) {
        if(error.statusCode){
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            )
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError(error));
    }
}


export const getWorkspaceController = async(req , res) =>{
    try{
        const response = await getWorkspaceService(
            req.params.workspaceId,
            req.user
        )
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, 'Workspace fetched successfully'));
    }catch(error){
        if(error.statusCode){
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            )
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError(error));
    }
}


export const getWorkspaceByJoinCodeController = async(req , res) =>{
    try{
        const response = await getWorkspaceByJoinCodeService(
            req.params.joinCode,
            req.user
        )
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, 'Workspace fetched successfully'));
    }catch(error){
        console.log("Get workspace by join code controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            )
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError(error));
    }
}

export const joinWorkspaceByCodeController = async (req, res) => {
    try {
        const response = await joinWorkspaceByCodeService(
            req.params.joinCode,
            req.user
        );

        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, 'Joined workspace successfully'));
    } catch (error) {
        console.log('Join workspace by code controller error', error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError(error));
    }
};

export const updateWorkspaceController = async(req , res) =>{
    try{
        const response = await updateWorkspaceService(
            req.params.workspaceId,
            req.body,
            req.user
        )
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, 'Workspace updated successfully'));
    }catch(error){
        console.log("Update workspace code controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            )
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError(error));
    }
}

export const addMemberToWorkSpaceController = async(req , res) =>{
    try{
        const response = await addMemberToWorkSpaceService(
            req.params.workspaceId,
            req.body.memberId,
            req.body.role || 'member',
            req.user
        )
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, 'Member added to workspace successfully'));
    }catch(error){
        console.log("Add member to workspace code controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            )
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError(error));
    }
}

export const addChannelToWorkSpaceController = async(req , res) =>{
    try{
        const response = await addChannelToWorkSpaceService(
            req.params.workspaceId,
            req.body.channelName,
            req.user
        )
        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, 'Channel added to workspace successfully'));
    }catch(error){
        console.log("Add channel to workspace code controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            )
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError(error));
    }
}

export const resetWorkspaceJoinCodeController = async (req, res) => {
    try {
        const response = await resetWorkspaceJoinCodeService(
            req.params.workspaceId,
            req.user
        );

        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, "Join code reset successfully"));
    } catch (error) {
        console.log("Reset workspace join code controller error", error);

        if (error.statusCode) {
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            );
        }

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalServerError(error));
    }
};



export const verificationEmailController = async (req, res) => {
    try {
        const response = await verifyTokenService(req.params.token);

        return res
            .status(StatusCodes.OK)
            .json(successResponse(response, "Email verified successfully"));
    } catch (error) {
        console.log("Verify email controller error", error);

        if (error.statusCode) {
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            );
        }

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalServerError(error));
    }
};


