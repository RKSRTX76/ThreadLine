export default function messageHandlers(io, socket){
    socket.on("joinChannel", async function joinChannelHandler(data, cb){
        const roomId = data.channelId;
        socket.join(roomId);
        cb?.({
            success : true,
            message : "Successfully joined the channel",
            data : roomId
        })
    })
}