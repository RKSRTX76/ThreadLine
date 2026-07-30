import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resetJoinCodeRequest } from "@/api/workspace";

import { useAuth } from "../context/useAuth"

export const useResetJoinCode = (workspaceId) =>{
    const {auth} = useAuth();
    const queryClient = useQueryClient();

    const {mutateAsync : resetJoinCodeMutation, isSuccess, isPending, error } = useMutation({
        mutationFn : () => resetJoinCodeRequest({ workspaceId, token : auth?.token}),
        onSuccess : ()=>{
            console.log("Join code reset successfully");
            queryClient.invalidateQueries({ queryKey: ['fetchWorkspaceById', workspaceId] });
        },
        onError : (error) =>{
            console.log('Error in reseting join code', error);
        }
    });

    return {
        resetJoinCodeMutation,
        isSuccess,
        isPending,
        error
    }
}