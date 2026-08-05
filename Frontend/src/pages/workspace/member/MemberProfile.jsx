import { LuLoader, LuTriangleAlert } from "react-icons/lu";
import { useParams } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetWorkspaceById } from "@/hooks/workspace/useGetWorkspaceById";

export const MemberProfile = () => {
    const { workspaceId, memberId } = useParams();
    const { workspace, isFetching, isSuccess } = useGetWorkspaceById(workspaceId);

    if (isFetching) {
        return (
            <div className="flex h-full items-center justify-center">
                <LuLoader className="size-5 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!isSuccess) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                <LuTriangleAlert className="size-6" />
                <span className="text-sm">Unable to load this member.</span>
            </div>
        );
    }

    const membership = workspace?.members?.find(
        (item) => String(item.memberId?._id) === String(memberId)
    );
    const member = membership?.memberId;

    if (!member) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Member not found in this workspace.
            </div>
        );
    }

    return (
        <div className="flex h-full items-center justify-center p-6">
            <section className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <Avatar className="size-16">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">
                            {member.username?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <h1 className="truncate text-xl font-semibold">{member.username}</h1>
                        <p className="truncate text-sm text-muted-foreground">{member.email}</p>
                        <p className="mt-1 text-xs capitalize text-muted-foreground">{membership.role}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};
