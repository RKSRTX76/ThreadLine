import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { io } from 'socket.io-client';

import { useChannelMessages } from "@/hooks/context/useChannelMessages";

const SocketContext = createContext();

export const SocketContextProvider = ({ children })=>{
    const socket = useMemo(
        () => io(import.meta.env.VITE_BACKEND_SOCKET_URL),
        []
    );

    const [currentChannel, setCurrentChannel] = useState(null);
    const { setMessageList } = useChannelMessages();

    useEffect(() => {
        function handleNewMessage(data) {
            console.log('New message received', data);
            setMessageList((messages) => [...messages, data]);
        }

        socket.on('newMessageReceived', handleNewMessage);

        return () => {
            socket.off('newMessageReceived', handleNewMessage);
            socket.disconnect();
        };
    }, [setMessageList, socket]);

    const joinChannel = useCallback((channelId) => {
        socket.emit('joinChannel', {channelId}, (data)=>{
            console.log('Successfully joined the channel', data);
            if (data?.success) {
                setCurrentChannel(data.data);
            }
        })
    }, [socket]);

    return (
        <SocketContext.Provider  value={{socket, joinChannel, currentChannel}}>
            {children}
        </SocketContext.Provider>
    )
}


export default SocketContext;
