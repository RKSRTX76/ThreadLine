import { useMutation } from "@tanstack/react-query";

import { updateWorkspaceRequest } from "@/api/workspace";

import { useAuth } from "../context/useAuth";

export const useUpdateWorkspace = (workspaceId) =>{
    const { auth } = useAuth();
    const {isPending, isSuccess, error, mutateAsync : updateWorkspaceMutation } = useMutation({
        mutationFn : (name) => updateWorkspaceRequest({workspaceId, name, token : auth?.token}),
        onSuccess : () => {
            console.log("Workspace updated successfully");
        },
        onError : ()=> {
            console.log("Error in updatec workspace", error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        updateWorkspaceMutation
    };
};