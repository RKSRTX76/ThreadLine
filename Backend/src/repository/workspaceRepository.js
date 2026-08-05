import { StatusCodes } from "http-status-codes";

import User from "../schema/user.js";
import Workspace from "../schema/workspace.js";
import ClientError from "../utils/errors/ClientError.js";
import { createChannel } from "./channelRepository.js";

export const createWorkSpace = async ({ workspaceName, description, owner, joinCode }) => {
    try {
        const workspace = await Workspace.create({
            name: workspaceName,
            description,
            joinCode
        });

        await addMemberToWorkSpace(
            workspace._id,
            owner,
            'admin'
        );

        await addChannelToWorkSpace(
            workspace._id,
            'general'
        );

        return Workspace.findById(workspace._id)
            .populate('members.memberId', 'username email avatar')
            .populate('channels');
    } catch (error) {
        if (error.code === 11000 && error.keyPattern?.name) {
            throw new ClientError({
                explanation: 'A workspace with this name already exists',
                message: 'Workspace name already exists',
                statusCode: StatusCodes.CONFLICT
            });
        }

        throw error;
    }
};

export const getWorkSpaceByName = async (workspaceName) => {
    const workspace = await Workspace.findOne({ name: workspaceName });

    if (!workspace) {
        throw new ClientError({
            explanation: 'Invalid data sent from client',
            message: 'Workspace not found',
            statusCode: StatusCodes.NOT_FOUND
        });
    }

    return workspace;
};

export const getWorkSpaceById = async (workspaceId) => {
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
        throw new ClientError({
            explanation: 'Invalid data sent from client',
            message: 'Workspace not found',
            statusCode: StatusCodes.NOT_FOUND
        });
    }

    return workspace;
};

export const getWorkSpaceDetailsById = async (workspaceId) => {
    const workspace = await Workspace.findById(workspaceId)
    .populate('members.memberId', 'username email avatar')
    .populate('channels')

    if (!workspace) {
        throw new ClientError({
            explanation: 'Invalid data sent from client',
            message: 'Workspace not found',
            statusCode: StatusCodes.NOT_FOUND
        });
    }

    return workspace;
};


export const getWorkSpaceByJoinCode = async (joinCode) => {
    if (!joinCode) {
        throw new ClientError({
            explanation: 'Join code is required',
            message: 'Join code is required',
            statusCode: StatusCodes.BAD_REQUEST
        });
    }

    const trimmedCode = joinCode.trim();
    const workspace = await Workspace.findOne({
        joinCode: { $regex: new RegExp(`^${trimmedCode}$`, 'i') }
    });

    if (!workspace) {
        throw new ClientError({
            explanation: 'Invalid data sent from client',
            message: 'Workspace not found',
            statusCode: StatusCodes.NOT_FOUND
        });
    }

    return workspace;
};

export const addMemberToWorkSpace = async (workspaceId, memberId, role) => {
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
        throw new ClientError({
            explanation: 'Invalid data sent from client',
            message: 'Workspace not found',
            statusCode: StatusCodes.NOT_FOUND
        });
    }

    const isValidUser = await User.findById(memberId);

    if (!isValidUser) {
        throw new ClientError({
            explanation: 'Invalid data sent from client',
            message: 'User not found',
            statusCode: StatusCodes.NOT_FOUND
        });
    }

    const isAlreadyMember = workspace.members.some((member) => {
        const id = (member.memberId?._id || member.memberId)?.toString();
        return id === memberId?.toString();
    });

    if (isAlreadyMember) {
        throw new ClientError({
            explanation: 'Invalid data sent from client',
            message: 'User already part of workspace',
            statusCode: StatusCodes.CONFLICT
        });
    }

    workspace.members.push({
        memberId,
        role
    });

    await workspace.save();

    return workspace;
};

export const addChannelToWorkSpace = async (workspaceId, channelName) => {
    const workspace = await Workspace.findById(workspaceId).populate('channels');

    if (!workspace) {
        throw new ClientError({
            explanation: 'Invalid data sent from client',
            message: 'Workspace not found',
            statusCode: StatusCodes.NOT_FOUND
        });
    }

    const isChannelAlreadyPartOfWorkspace = workspace.channels.some(
        (channel) => channel.name === channelName
    );

    if (isChannelAlreadyPartOfWorkspace) {
        throw new ClientError({
            explanation: 'Invalid data sent from client',
            message: 'Channel already part of workspace',
            statusCode: StatusCodes.CONFLICT
        });
    }

    const channel = await createChannel(channelName, workspaceId);

    workspace.channels.push(channel._id);
    await workspace.save();

    return Workspace.findById(workspaceId)
    .populate('channels')
    .populate('members.memberId', 'username email avatar');
};

export const fetchAllWorkSpaceByMemberId = async (memberId) => {
    const workspace = await Workspace.find({
        'members.memberId' : memberId
    }).populate('members.memberId', 'username email avatar');

    return workspace;
};

export const deleteWorkSpaceById = async (workspaceId) => {
    const workspace = await Workspace.findByIdAndDelete(workspaceId);
    return workspace;
};

export const updateWorkspaceById = async (workspaceId, workspaceData) => {
    try {
        return await Workspace.findByIdAndUpdate(
            workspaceId,
            workspaceData,
            {
                new: true,
                runValidators: true
            }
        );
    } catch (error) {
        if (error.code === 11000 && error.keyPattern?.name) {
            throw new ClientError({
                explanation: 'A workspace with this name already exists',
                message: 'Workspace name already exists',
                statusCode: StatusCodes.CONFLICT
            });
        }

        throw error;
    }
};
