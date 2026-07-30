import { useEffect, useState } from "react";
import { LuChevronDown, LuListFilter, LuSquarePen } from "react-icons/lu"

import { WorkspaceInviteModal } from "@/components/organisms/modals/WorkspaceInviteModal";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/context/useAuth";
import { useWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";

export const WorkspacePanelHeader = ({workspace})=>{

    const workspaceMembers = workspace?.members;
    const {auth} = useAuth();

    const { setWorkspace } = useWorkspacePreferencesModal();

    const [ openInviteModal, setOpenInviteModal ] = useState(false);

    const isCurrUserAdmin = workspaceMembers?.find(member => member.memberId._id === auth?.user?._id && member.role === 'admin');

    const {setOpenPreferences, setInitialValue} = useWorkspacePreferencesModal();

    console.log(isCurrUserAdmin);
    console.log('Workspace is ', workspace);


    useEffect(()=>{
        setWorkspace(workspace);
    }, [workspace, setWorkspace]);


    return (
        <>
            <WorkspaceInviteModal 
                openInviteModal={openInviteModal}
                setOpenInviteModal={setOpenInviteModal}
                workspaceName={workspace?.name}
                joinCode={workspace?.joinCode}
                workspaceId = {workspace?._id}
            />
            <div className="flex h-[56px] items-center justify-between border-b border-black/20 px-3">
            <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex w-auto items-center overflow-hidden rounded-md p-2 text-base font-semibold hover:bg-white/8">
                    <span className="truncate">{workspace?.name}</span>
                    <LuChevronDown className="size-5 ml-1" />
                </DropdownMenuTrigger>

                <DropdownMenuContent side="bottom" align="start" className="w-64" >
                    <DropdownMenuItem>
                        <div
                            className="size-9 relative overflow-hidden text-white font-semibold text-xl
                            rounded-md flex items-center justify-center mr-2 bg-[#606061]"
                        >
                            {workspace?.name.charAt(0).toUpperCase()}
                        </div>
                        <div className=" flex flex-col items-start">
                            <p className="font-bold">
                                {workspace?.name}
                            </p>
                            <p className="text-xs text-muted-foreground" >
                                Active Workspace
                            </p>
                        </div>
                    </DropdownMenuItem>
                    { isCurrUserAdmin && (
                        <>
                            <DropdownMenuItem 
                            className="cursor-pointer py-2" 
                            onClick = { ()=> {
                                setInitialValue(workspace?.name)
                                setOpenPreferences(true)
                            }}
                            >
                                Preferences
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                            className="cursor-pointer py-2" 
                            onClick = {()=> setOpenInviteModal(true)   }
                            >
                                Invite people to {workspace?.name}
                            </DropdownMenuItem>
                        </>

                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-0.5" >
                    <Button variant="ghost" size="icon-sm">
                        <LuListFilter className="size-5" />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                        <LuSquarePen className="size-5" />
                    </Button>
            </div>
        </div>
        </>
    )
}
