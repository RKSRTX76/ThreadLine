import { z } from 'zod';


export const workspaceSchema = z.object({
    name : z.string().min(3).max(30)
})

export const addMemberToWorkSpaceSchema = z.object({
    memberId : z.string()
})

export const addChannelToWorkSpaceSchema = z.object({
    channelName : z.string()
})