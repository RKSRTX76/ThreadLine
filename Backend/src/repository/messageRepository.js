import Message from "../schema/message.js";


export const getPaginatedMessages = async(messageParams, page, limit) =>{
    const messages = await Message.find(messageParams)
        .sort({ createdAt : -1 })
        .skip((page - 1)*limit)
        .limit(limit)
        .populate('senderId', 'username email avatar');

    return messages;    
}

export const createMessage = async(message) =>{
    const messages = await Message.create(message);
        
    return messages;    
}