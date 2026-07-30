import Channel from "../schema/channel.js"

export const createChannel = async(channelName, workspaceId)=>{
    const channel = await Channel.create({
        name : channelName,
        workspaceId
    });
    return channel;
}

export const deleteManyChannels = async(channelIds) => {
    const response = await Channel.deleteMany({
        _id : {
            $in : channelIds
        }
    })
    return response;
}

export const getChannelById = async(channelId) => {
    const response = await Channel.findById(channelId);
    return response;
}

export const getChannelWithWorkspaceDetails = async(channelId)=>{
    const channel = await Channel.findById(channelId).populate('workspaceId');
    return channel;
}

