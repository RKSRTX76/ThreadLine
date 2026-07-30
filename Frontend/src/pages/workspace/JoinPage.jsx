import { LuLoaderCircle } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast-manager";
import { useWorkspaceInvite } from "@/hooks/workspace/useWorkspaceInvite";

export const JoinPage = () => {
    const { joincode } = useParams();
    const navigate = useNavigate();
    const { data: workspace, isLoading, isError, acceptInvite, isAccepting } =
        useWorkspaceInvite(joincode);

    async function handleAcceptInvite() {
        try {
            const joinedWorkspace = await acceptInvite();
            toast.add({
                description: `You joined ${workspace?.name || 'workspace'}`,
                type: 'success'
            });
            if (joinedWorkspace?._id) {
                navigate(`/workspaces/${joinedWorkspace._id}`);
            } else {
                navigate('/home');
            }
        } catch (error) {
            toast.add({
                description: error?.message || 'Unable to join this workspace',
                type: 'error'
            });
        }
    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <LuLoaderCircle className="size-7 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#1e1f22] p-4">
                <div className="w-full max-w-sm rounded-xl bg-card p-7 text-center shadow-2xl ring-1 ring-white/10">
                    <h1 className="text-lg font-semibold">Invite unavailable</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        This invite link is invalid or has expired.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#1e1f22] p-4">
            <section className="w-full max-w-md rounded-xl bg-card p-8 shadow-2xl ring-1 ring-white/10">
                <p className="text-sm font-medium text-primary">WORKSPACE INVITATION</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight">Join {workspace?.name}</h1>
                <p className="mt-3 text-sm text-muted-foreground">
                    You have been invited to join this workspace.
                </p>
                <Button
                    className="mt-6 w-full"
                    onClick={handleAcceptInvite}
                    disabled={isAccepting}
                >
                    {isAccepting ? 'Joining...' : 'Accept Invite'}
                </Button>
            </section>
        </main>
    );
};
