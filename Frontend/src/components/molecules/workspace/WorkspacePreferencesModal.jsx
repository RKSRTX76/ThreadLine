import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LuTrash } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast-manager";
import { useWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { useConfirm } from "@/hooks/useConfirm";
import { useDeleteWorkspace } from "@/hooks/workspace/useDeleteWorkspace";
import { useUpdateWorkspace } from "@/hooks/workspace/useUpdateWorkspace";


export const WorkspacePreferenceModal = () =>{

    const queryClient = useQueryClient();

    const {initialValue, openPreferences, setOpenPreferences, workspace} = useWorkspacePreferencesModal();
    
    const workspaceId = workspace?._id ?? null;
    
    const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);
    

    const [editOpen, setEditOpen] = useState(false);

    const [renameValue, setRenameValue] = useState("");

    const { isPending, updateWorkspaceMutation } = useUpdateWorkspace(workspaceId);

    const { confirmation, ConfirmDialog } = useConfirm({title : 'Do you want to delete the workspace?', message : "This action cannot be undone."});

    const { confirmation : updateConfirmation, ConfirmDialog : UpdateConfirmDialog } = useConfirm({title : 'Do you want to rename the workspace?', message : "This action cannot be undone."});

    const navigate = useNavigate();

    function handleClose(){
        setOpenPreferences(false);
    }


    function handleEditOpenChange(isOpen) {
        setEditOpen(isOpen);
        if (isOpen) {
            setRenameValue(workspace?.name ?? "");
        }
    }

    async function handleDelete(){
        try {
            const ok = await confirmation();
            if(!ok) return;
            await deleteWorkspaceMutation();
            queryClient.invalidateQueries(['fetchWorkspaceById', workspaceId]);
            setOpenPreferences(false);
            navigate('/');

            toast.add({
                title : "Workspace deleted successfully",
                type : "success"
            });
        } catch (error) {
            console.log("Error deleting workspace", error);
            toast.add({
                title : "Error deleting workspace",
                type : 'error'
            });
        }
    }

    async function handleFormSubmit(e){
        e.preventDefault();
        try {
            const ok = await updateConfirmation();
            if(!ok) return;
            await updateWorkspaceMutation(renameValue);
            queryClient.invalidateQueries('fetchWorkspaces');
            setOpenPreferences(false);
            setEditOpen(false);

            toast.add({
                title : "Workspace updated successfully",
                type : "success"
            });
        } catch (error) {
            console.log("Error updating workspace", error);
            toast.add({
                title : "Error updating workspace",
                type : 'error'
            });
        }
    }


    return (
       <>
            <ConfirmDialog />
            <UpdateConfirmDialog />
             <Dialog open = {openPreferences} onOpenChange = {handleClose}>
            <DialogContent className="max-w-md overflow-hidden border border-white/10 bg-card p-0">
                <DialogHeader className="border-b border-white/10 px-6 py-5 pr-12" >
                    <DialogTitle>Workspace settings</DialogTitle>
                    <DialogDescription>Manage preferences for {initialValue}.</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-y-3 bg-[#1e1f22]/45 px-5 py-5" >
                    <Dialog open={editOpen} onOpenChange={handleEditOpenChange}>
                        <DialogTrigger asChild>
                            <button type="button" className="w-full rounded-lg border border-white/10 bg-card px-5 py-4 text-left transition-colors hover:bg-accent" >
                                <div className="flex items-center justify-between" >
                                    <p className="text-sm font-semibold" >
                                        Workspace Name
                                    </p>
                                    <p className="text-sm font-semibold text-primary">
                                        Edit
                                    </p>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {workspace?.name || initialValue}
                                </p>
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Rename Workspace</DialogTitle>
                            </DialogHeader>

                            <form className="space-y-4" onSubmit={handleFormSubmit}>
                                <Input 
                                value={renameValue} 
                                onChange = {(e)=> setRenameValue(e.target.value)} 
                                required
                                autoFocus
                                minLength = {3}
                                maxLength = {30}
                                disabled= {isPending}
                                placeholder='workspace name e.g Design team'
                                />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" disabled={isPending}>Cancel</Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                >
                                    Save
                                </Button>
                            </DialogFooter>
                            </form>

                        </DialogContent>
                    </Dialog>

                    
                    <button
                        onClick={handleDelete}
                        className="flex w-full cursor-pointer items-center gap-x-2 rounded-lg border border-destructive/30 bg-destructive/10 px-5 py-4 text-rose-400 transition-colors hover:bg-destructive/20"
                    >
                        <LuTrash className="size-5" />
                        <p className="text-sm font-semibold">Delete Workspace</p>
                    </button>

                </div>
            </DialogContent>
        </Dialog>
       </>
    )

}
