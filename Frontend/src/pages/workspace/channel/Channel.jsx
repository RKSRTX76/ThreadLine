import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { LuLoader, LuTriangleAlert } from "react-icons/lu";
import { useParams } from "react-router-dom"

import { ChannelHeader } from "@/components/molecules/ChannelHeader/ChannelHeader"                                                             
import { ChatInput } from "@/components/molecules/chatInput/ChatInput";    
import { Message } from "@/components/molecules/message/Message";                                                                                                                                 
import { useGetChannelById } from "@/hooks/api/channels/useGetChannelById";
import { useGetChannelMessages } from "@/hooks/api/channels/useGetChannelMessages";
import { useAuth } from "@/hooks/context/useAuth";
import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { useSocket } from "@/hooks/context/useSocket";

export const Channel = ()=>{

    const { channelId } = useParams();
    const queryClient = useQueryClient();

    const {channelDetails, isFetching, isError } = useGetChannelById(channelId);
    const { auth } = useAuth();
    const {messageList, setMessageList } = useChannelMessages();
    const { joinChannel } = useSocket();
    const { messages, isSuccess } = useGetChannelMessages(channelId);
    const messageContainerListRef = useRef(null);

    useEffect(() => {
        if(messageContainerListRef.current){
            messageContainerListRef.current.scrollTop = messageContainerListRef.current.scrollHeight;
        }
    }, [messageList]);
    
    useEffect(()=>{
        queryClient.invalidateQueries({ queryKey: ['getPaginatedMessages', channelId] });
    }, [channelId, queryClient]);

    useEffect(()=>{
        if(!isFetching && !isError){
            joinChannel(channelId);
        }
    }, [isFetching, isError, joinChannel, channelId]);

    useEffect(()=>{
        if(isSuccess){
            console.log('Channel Messages fetched');
            setMessageList([...(messages ?? [])].reverse());
        }
    }, [isSuccess, messages, setMessageList, channelId]);


    if(isFetching){
        return (
            <div className="h-full flex-1 flex items-center justify-center">
                <LuLoader className="size-5 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if(isError){
        return (
            <div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center" >
                <LuTriangleAlert className="size-6 text-muted-foreground" />
                <span className="text-sm text-muted-foreground" >Channel not found</span>
            </div>
        )
    }
    
    
    return (
        <div className="flex flex-col h-full">
            <ChannelHeader name = {channelDetails?.name} />

            {/* We need to make sure ther below div is scrollable for the message */}
            <div
                ref = {messageContainerListRef}
                className="flex-1 overflow-y-auto py-4"
            >
                {messageList?.map((message) => {
                    const senderId = message.senderId?._id ?? message.senderId;
                    const isOwnMessage = String(senderId) === String(auth?.user?._id);

                    return <Message key={message._id} body={message.body} authorImage={message.senderId?.avatar} authorName={message.senderId?.username} createdAt={message.createdAt} image={message.image} isOwnMessage={isOwnMessage} />;
                })} 
            </div>

            <div className="border-t border-black/15 bg-background py-3">
                <ChatInput />
            </div>
        </div>
    )
}
