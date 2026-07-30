import { StatusCodes } from "http-status-codes";

import { getChannelWithWorkspaceDetails } from "../repository/channelRepository.js";
import { createMessage, getPaginatedMessages } from "../repository/messageRepository.js"
import ClientError from "../utils/errors/ClientError.js";
import { isUserMemberOfWorkspace } from "./workspaceService.js";

export const getMessagesService = async (messageParams, page, limit, user) =>{

    const channelDetails = await getChannelWithWorkspaceDetails(
        messageParams.channelId
    )
    const workspace = channelDetails.workspaceId

    const isMember = isUserMemberOfWorkspace(workspace, user);

    if(!isMember){
        throw new ClientError({
            explanation : 'User is not a member of the workspace',
            message : 'User is not a member of the workspace',
            statusCode : StatusCodes.UNAUTHORIZED
        })
    }

    const messages = await getPaginatedMessages(
        messageParams,
        page,
        limit
    )
    return messages;
}


export const createMessageService = async(message)=>{
    const newMessage = await createMessage(message);
    return newMessage.populate('senderId', 'username email avatar');
}
