
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast-manager";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useAddChannelToWorkspace } from "@/hooks/workspace/useAddChannelToWorkspace";

export const CreateChannelModel = ()=>{
    const {openCreateChannelModal, setOpenCreateChannelModal } = useCreateChannelModal();
    const { addChannelToWorkspaceMutation } = useAddChannelToWorkspace();

    const { currentWorkspace } = useCurrentWorkspace();
    const [channelName, setChannelName] = useState('');
    const queryClient = useQueryClient(); 

    // const navigate = useNavigate();

    function handleClose(){
        setOpenCreateChannelModal(false);
        // reset
        setChannelName('');
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        
        await addChannelToWorkspaceMutation({
            workspaceId : currentWorkspace?._id,
            channelName : channelName
        });

        toast.add({
            description : "Channel created successfully",
            type : 'success'
        })

        handleClose();

        queryClient.invalidateQueries(['fetchWorkspaceById',currentWorkspace._id]);
    }

    return (
        <Dialog
            open = {openCreateChannelModal}
            onOpenChange = {handleClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new Channel</DialogTitle>
                </DialogHeader>

                <form  onSubmit={handleFormSubmit}>
                    <Input 
                    required
                    // disabled= {isPending}
                    minLength={3}
                    value={channelName}
                    placeholder='Channel name e.g General'
                    onChange = {(e) => setChannelName(e.target.value)}
                    />
                    <div className="flex justify-end mt-5" >
                        <Button 
                            // disabled={isPending} 
                            type="submit" 
                        >
                            Create Channel
                        </Button>
                    </div>
                </form>
            </DialogContent>
            
        </Dialog>
    )
}