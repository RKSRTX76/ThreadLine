import { LuLoader } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useFetchWorkspace } from "@/hooks/workspace/useFetchWorkspace";
import { useGetWorkspaceById } from "@/hooks/workspace/useGetWorkspaceById";

export const WorkspaceSwitcher = ()=>{
    const navigate = useNavigate();

    const { workspaceId } = useParams();

    const { isFetching, workspace } = useGetWorkspaceById(workspaceId);

    const { workspaces , isFetching : isFetchingWorkspace } = useFetchWorkspace();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="relative inline-flex size-11 items-center justify-center overflow-hidden rounded-2xl bg-primary text-xl font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-105">
                { isFetching ? (<LuLoader className="size-5 animate-spin" />) : (workspace?.name.charAt(0).toUpperCase())}
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer flex-col justify-start items-start" >
                    <p className="truncate">{workspace?.name}</p>
                    <span className="text-xs text-muted-foreground">(Active)</span>
                </DropdownMenuItem>

                { isFetchingWorkspace ? (
                    <LuLoader className="size-5 animate-spin" />
                ) : (
                    workspaces?.map((workspace)=>{
                        if(workspace._id === workspaceId){
                            return null;
                        }

                        return (
                            <DropdownMenuItem 
                            key={workspace._id} 
                            onClick = {()=> navigate(`/workspaces/${workspace._id}`)}
                            className="cursor-pointer flex-col justify-start items-start" 
                            >
                                <p className="truncate">{workspace?.name}</p>
                            </DropdownMenuItem>
                        )
                    })
                )}
            </DropdownMenuContent>

        </DropdownMenu>
    )
}
