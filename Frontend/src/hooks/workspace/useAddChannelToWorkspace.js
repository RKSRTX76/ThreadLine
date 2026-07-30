import { useMutation } from "@tanstack/react-query";

import { addChannelToWorkspaceRequest } from "@/api/workspace";

import { useAuth } from "../context/useAuth";

export const useAddChannelToWorkspace = () =>{
    const { auth } = useAuth();
    const {isPending, isSuccess, error, mutateAsync : addChannelToWorkspaceMutation } = useMutation({
        mutationFn : ({workspaceId, channelName}) => addChannelToWorkspaceRequest({workspaceId, channelName, token : auth?.token}),
        onSuccess : () => {
            console.log("Channel added successfully");
        },
        onError : ()=> {
            console.log("Error in adding channel to  workspace", error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        addChannelToWorkspaceMutation
    };
};