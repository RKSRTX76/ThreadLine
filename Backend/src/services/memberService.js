import { StatusCodes } from "http-status-codes";

import { getUserById } from "../repository/userRepository.js";
import { getWorkSpaceById } from "../repository/workspaceRepository.js";
import ClientError from "../utils/errors/ClientError.js";
import { isUserMemberOfWorkspace } from "./workspaceService.js";

export const isMemberPartOfWorkService = async(workspaceId, memberId) =>{
    const workspace = await getWorkSpaceById(workspaceId);

    if(!workspace){
        throw new ClientError({
            explanation : 'Workspace not found',
            message : 'Workspace not found',
            statusCode : StatusCodes.NOT_FOUND
        })
    }
    const isUserAMember = isUserMemberOfWorkspace(workspace, memberId);

    if(!isUserAMember){
        throw new ClientError({
            explanation : 'User is not a member of the workspace',
            message : 'User is not a member of the workspace',
            statusCode : StatusCodes.UNAUTHORIZED
        })
    }
    const user = await getUserById(memberId);

    return user;
}