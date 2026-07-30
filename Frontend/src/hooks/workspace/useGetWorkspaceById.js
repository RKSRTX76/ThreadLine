import { useQuery } from "@tanstack/react-query";

import { fetchWorkspaceDetailsRequest } from "@/api/workspace";

import { useAuth } from "../context/useAuth"

export const useGetWorkspaceById = (workspaceId)=>{
    const {auth} = useAuth();

    const {isFetching, isSuccess, error, data : workspace} = useQuery({
        queryKey : ['fetchWorkspaceById', workspaceId],
        queryFn : () => fetchWorkspaceDetailsRequest({ workspaceId, token : auth?.token}),
        staleTime : 10000,
        refetchOnWindowFocus: false
    });

    return {
        isFetching,
        isSuccess,
        error,
        workspace
    }
}