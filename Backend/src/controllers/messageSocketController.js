
import { createMessageService } from "../services/messageService.js";

export default function messageHandlers(io, socket){
    socket.on('newMessage', async function createMessageHandler(data, callback){
        try {
            const messageResponse = await createMessageService(data);
            const {channelId} = data;

            io.to(channelId).emit('newMessageReceived', messageResponse);
            callback?.({
                success : true,
                message : 'Successfully created the message',
                data : messageResponse
            });
        } catch (error) {
            console.error('Error creating message', error);
            callback?.({
                success: false,
                message: error.message || 'Unable to create message'
            });
        }
    });
}

