import { LuCopy, LuRefreshCcw } from "react-icons/lu"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/components/ui/toast-manager";
import { useResetJoinCode } from "@/hooks/workspace/useResetJoinCode";

export const WorkspaceInviteModal = ({openInviteModal, setOpenInviteModal, workspaceName, joinCode, workspaceId})=>{
    
    const { resetJoinCodeMutation } = useResetJoinCode(workspaceId);
    async function handleCopy(){
        const inviteLink = `${window.location.origin}/join/${joinCode}`;
        await navigator.clipboard.writeText(inviteLink);

        toast.add({
            description : "Link copied to clipboard",
            type : 'success'
        })
    }

     async function handleResetCode(){
       try {
         await resetJoinCodeMutation();
         toast.add({
            description : "Join code reset successful",
            type : 'success'
        })
       } catch (error) {
        console.log('Error in resetting join code', error);
       }
    
    }
    
    return (
        <Dialog open={openInviteModal} onOpenChange = {setOpenInviteModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Invite people to {workspaceName}
                    </DialogTitle>
                    <DialogDescription>
                        Use the code shown below to invite people to your workspace.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center py-10 gap-y-4">
                    <p className="font-bold text-3xl uppercase">{joinCode}</p>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCopy}
                    >
                        Copy link 
                        <LuCopy className="size-4 ml-2" />
                    </Button>
                </div>
                <div className="flex items-center justify-center w-full">
                    <Button
                        variant="outline"
                        onClick={handleResetCode}
                    >
                        Reset Join Code
                        <LuRefreshCcw className="size-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}