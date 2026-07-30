import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import { addEmailtoMailQueue } from '../producer/mailQueueProducer.js';
import { deleteManyChannels } from '../repository/channelRepository.js';
import { getUserById } from '../repository/userRepository.js';
import {
    addChannelToWorkSpace,
    addMemberToWorkSpace,
    createWorkSpace,
    deleteWorkSpaceById,
    fetchAllWorkSpaceByMemberId,
    getWorkSpaceById,
    getWorkSpaceByJoinCode,
    getWorkSpaceDetailsById,
    updateWorkspaceById
} from '../repository/workspaceRepository.js';
import { workspaceJoinMail } from '../utils/common/mailObject.js';
import ClientError from '../utils/errors/ClientError.js';


const getMemberIdString = (member) => {
    if (!member || !member.memberId) return null;
    return (member.memberId._id || member.memberId).toString();
};

export const isUserAdminOfWorkspace = (workspace, userId) => {
    if (!workspace || !workspace.members) return false;
    const targetId = userId?.toString();
    return workspace.members.some(
        (member) => getMemberIdString(member) === targetId && member.role === 'admin'
    );
};

export const isUserMemberOfWorkspace = (workspace, userId) => {
    if (!workspace || !workspace.members) return false;
    const targetId = userId?.toString();
    return workspace.members.some(
        (member) => getMemberIdString(member) === targetId
    );
};

export const isChannelAlreadyPartOfWorkspace = (workspace, channelName)=>{
    return workspace.channels.some((channel)=>{
        channel.name?.toLowerCase() === channelName.toLowerCase()
    })
}


export const createWorkspaceService = async ({ name: workspaceName, description, owner }) => {
    const joinCode = uuidv4().substring(0, 6).toUpperCase();

    return createWorkSpace({
        workspaceName,
        description,
        owner,
        joinCode
    });
};

export const getWorkspaceUserIsMemberOfService = async (userId) => {
    return fetchAllWorkSpaceByMemberId(userId);
};

export const deleteWorkspaceService = async (workspaceId, userId) => {
    const workspace = await getWorkSpaceById(workspaceId);
    if(!workspace){
        throw new ClientError({
            explanation : 'Workspace does not exist',
            message  : "Workspace not found",
            statusCode : StatusCodes.NOT_FOUND
        })
    }
    const isAdmin = isUserAdminOfWorkspace(workspace, userId);

    if (!isAdmin) {
        throw new ClientError({
            explanation: 'Only workspace admins can delete a workspace',
            message: 'You are not allowed to delete this workspace',
            statusCode: StatusCodes.FORBIDDEN
        });
    }

    await deleteManyChannels(workspace.channels);

    return deleteWorkSpaceById(workspaceId);
};


export const getWorkspaceService = async(workspaceId, userId)=>{
    try {
        const workspace = await getWorkSpaceDetailsById(workspaceId);
        if(!workspace){
            throw new ClientError({
                explanation : "Invalid data sent from the client",
                message : 'Workspace not found',
                statusCode : StatusCodes.NOT_FOUND
            });
        }
        const isMember = isUserMemberOfWorkspace(workspace, userId);
        if(!isMember){
            throw new ClientError({
                explanation : "User is not a member of the workspace",
                message : 'User is not a member of the workspace',
                statusCode : StatusCodes.UNAUTHORIZED
            });
        }
        return workspace;
    } catch (error) {
        console.log("Get workspace service error", error);
        throw error;
    }
}


export const getWorkspaceByJoinCodeService = async(joincode)=>{
    try{
        const workspace = await getWorkSpaceByJoinCode(joincode);
        return {
            _id: workspace._id,
            name: workspace.name
        };
    }catch(error){
        console.log('Get workspace by join code service error', error);
        throw error;
    }
}

export const joinWorkspaceByCodeService = async (joinCode, userId) => {
    try {
        const workspace = await getWorkSpaceByJoinCode(joinCode);

        if (!isUserMemberOfWorkspace(workspace, userId)) {
            await addMemberToWorkSpace(workspace._id, userId, 'member');
        }

        return {
            _id: workspace._id,
            name: workspace.name
        };
    } catch (error) {
        console.log('Join workspace by code service error', error);
        throw error;
    }
}

export const updateWorkspaceService = async(workspaceId, workspaceData, userId)=>{
    try{
        const workspace = await getWorkSpaceById(workspaceId);
        if(!workspace){
            throw new ClientError({
                explanation : 'Invalid data sent from the client',
                message : 'Workspace not found',
                statusCode : StatusCodes.NOT_FOUND
            })
        }
        const isAdmin = isUserAdminOfWorkspace(workspace, userId);
        if(!isAdmin){
                throw new ClientError({
                    explanation : 'User is not an admin of the workspace',
                    message : 'User is not an admin of the workspace',
                    statusCode : StatusCodes.UNAUTHORIZED
                    
                })
        }
            
        const updatedWorkspace = await updateWorkspaceById(workspaceId, workspaceData);

        return updatedWorkspace;        
    }catch(error){
        console.log('Update workspace service error', error);
        throw error;
    }
}

export const addMemberToWorkSpaceService = async(workspaceId, memberId, role, userId)=>{
    try {
        const workspace = await getWorkSpaceById(workspaceId);
        if(!workspace){
            throw new ClientError({
                explanation : 'Invalid data sent from the client',
                message : 'Workspace not found',
                statusCode : StatusCodes.NOT_FOUND
            })
        }

        const isAdmin = isUserAdminOfWorkspace(workspace, userId);
        if(!isAdmin){
                throw new ClientError({
                    explanation : 'User is not an admin of the workspace',
                    message : 'User is not an admin of the workspace',
                    statusCode : StatusCodes.UNAUTHORIZED
                    
                })
        }
    
        const isValidUser = await getUserById(memberId);
        if(!isValidUser){
           throw new ClientError({
                explanation : 'Invalid data sent from the client',
                message : 'User is not a member of the workspace',
                statusCode : StatusCodes.UNAUTHORIZED 
            }) 
        }
        const isMember = isUserMemberOfWorkspace(workspace, memberId);
         if(isMember){
            throw new ClientError({
                explanation : 'User already a member of the workspace',
                message : 'User is already a member of the workspace',
                statusCode : StatusCodes.UNAUTHORIZED
                    
            })
        }

        const response = await addMemberToWorkSpace(workspaceId, memberId, role);

        addEmailtoMailQueue({
            ...workspaceJoinMail(workspace), 
            to : isValidUser.email,
        });


        return response;
    } catch (error) {
        console.log('Add member to workspace service error', error);
        throw error;
    }
}

export const resetWorkspaceJoinCodeService = async (workspaceId, userId) => {
    try {
        const workspace = await getWorkSpaceById(workspaceId);
        if (!workspace) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Workspace not found',
                statusCode: StatusCodes.NOT_FOUND
            });
        }

        const isAdmin = isUserAdminOfWorkspace(workspace, userId);
        if (!isAdmin) {
            throw new ClientError({
                explanation: 'User is not an admin of the workspace',
                message: 'Only workspace admins can reset the join code',
                statusCode: StatusCodes.UNAUTHORIZED
            });
        }

        const newJoinCode = uuidv4().substring(0, 6).toUpperCase();
        const updatedWorkspace = await updateWorkspaceById(workspaceId, {
            joinCode: newJoinCode
        });

        return updatedWorkspace;
    } catch (error) {
        console.log('Reset workspace Join code service error', error);
        throw error;
    }
};

export const addChannelToWorkSpaceService = async(workspaceId, channelName, userId)=>{
    try {
        const workspace = await getWorkSpaceById(workspaceId);
        await workspace.populate('channels');
        if(!workspace){
            throw new ClientError({
                explanation : 'Invalid data sent from the client',
                message : 'Workspace not found',
                statusCode : StatusCodes.NOT_FOUND 
            })
        }
        const isAdmin = isUserAdminOfWorkspace(workspace, userId);
        if(!isAdmin){
                throw new ClientError({
                    explanation : 'User is not an admin of the workspace',
                    message : 'User is not an admin of the workspace',
                    statusCode : StatusCodes.UNAUTHORIZED
                    
                })
        }

        const isChannelPartOfWorkspace = isChannelAlreadyPartOfWorkspace(workspace, channelName);

        if(isChannelPartOfWorkspace){
            throw new ClientError({
                explanation : 'Invalid data sent from the client',
                message : 'Channel already part of the workspace',
                statusCode : StatusCodes.FORBIDDEN 
            }) 
        }

        const response = await addChannelToWorkSpace(workspaceId, channelName);

        return response;

    } catch (error) {
        console.log('Add channel to workspace service error', error);
        throw error;
    }

}
