import { useQuery } from "@tanstack/react-query";

import { getPaginatedMessages } from "@/api/channels";
import { useAuth } from "@/hooks/context/useAuth"

export const useGetChannelMessages = (channelId)=>{
    const {auth} = useAuth();
    const { isFetching, isError, error, data, isSuccess } = useQuery({
        queryKey : ['getPaginatedMessages', channelId],
        queryFn : ()=>  getPaginatedMessages({channelId, limit : 10, offset : 0 ,token : auth?.token}),
        cacheTime : 0
    });

    return {
        isFetching,
        isError,
        error,
        messages : data,
        isSuccess
    }
}
