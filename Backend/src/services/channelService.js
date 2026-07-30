import { StatusCodes } from "http-status-codes";

import { getChannelWithWorkspaceDetails } from "../repository/channelRepository.js";
import { getPaginatedMessages } from "../repository/messageRepository.js";
import ClientError from "../utils/errors/ClientError.js";
import { isUserMemberOfWorkspace } from "./workspaceService.js";

export const getChannelByIdService = async(channelId, userId)=>{
    try {
        // const channel = await getChannelById(channelId);
        const channel = await getChannelWithWorkspaceDetails(channelId);
        if(!channel || !channel.workspaceId){
            throw new ClientError({
                message : 'Channel not found with the provided ID',
                explanation : "Invalid data sent from client",
                StatusCodes : StatusCodes.NOT_FOUND
            })
        }

        const isPartOfWorkspace = isUserMemberOfWorkspace(channel.workspaceId, userId);
        if(!isPartOfWorkspace){
             throw new ClientError({
                explanation : "User is not a member of workspace",
                message : "User is not a member of workspace",
                statusCode : StatusCodes.UNAUTHORIZED
            })
        }

        const messages = await getPaginatedMessages({channelId },1 , 20);

        // send custom response
        return {
            messages,
            _id: channel._id,
            name : channel.name,
            createdAt : channel.createdAt,
            updatedAt : channel.updatedAt,
            workspaceId : channel.workspaceId
        };
    } catch (error) {
        console.log('Get channel by ID service error', error);
        throw error;
    }
}
