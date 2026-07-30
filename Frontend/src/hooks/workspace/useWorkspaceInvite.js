import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    acceptWorkspaceInviteRequest,
    fetchWorkspaceInviteRequest
} from "@/api/workspace";

import { useAuth } from "../context/useAuth";

export const useWorkspaceInvite = (joinCode) => {
    const { auth } = useAuth();
    const queryClient = useQueryClient();

    const inviteQuery = useQuery({
        queryKey: ['workspaceInvite', joinCode],
        queryFn: () => fetchWorkspaceInviteRequest({
            joinCode,
            token: auth?.token
        }),
        enabled: Boolean(joinCode && auth?.token)
    });

    const acceptInviteMutation = useMutation({
        mutationFn: () => acceptWorkspaceInviteRequest({
            joinCode,
            token: auth?.token
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetchWorkspaces'] });
        }
    });

    return {
        ...inviteQuery,
        acceptInvite: acceptInviteMutation.mutateAsync,
        isAccepting: acceptInviteMutation.isPending
    };
};
