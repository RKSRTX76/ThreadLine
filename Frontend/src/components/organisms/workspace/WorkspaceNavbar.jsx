import { useEffect } from "react";
import { LuInfo, LuLoader, LuSearch } from "react-icons/lu";
import { useParams } from "react-router-dom"

import { Button } from "@/components/ui/button";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useGetWorkspaceById } from "@/hooks/workspace/useGetWorkspaceById";

export const WorkspaceNavbar = ()=>{
    const {workspaceId} = useParams();

    const {isFetching, workspace} = useGetWorkspaceById(workspaceId);

    const {setCurrentWorkspace} = useCurrentWorkspace();

    useEffect(()=>{
        if(workspace){
            setCurrentWorkspace(workspace);
        }
    }, [workspace, setCurrentWorkspace]);

    
    if(isFetching){
        return <LuLoader className="animate-spin ml-2" />
    }

    

    return (
        <nav className="flex h-12 items-center justify-center border-b border-black/30 bg-slack-dark px-3" >
            <div className="flex-1" />
            <div>
                <Button 
                size="sm"
                className= "w-[min(420px,48vw)] justify-start bg-[#1e1f22] text-muted-foreground hover:bg-[#292b2f] hover:text-foreground" >

                    <LuSearch className="mr-2 size-4" />
                    <span className="text-sm" >
                        Search {workspace?.name || 'Workspace'}
                    </span>
                </Button>
            </div>
            <div className=" ml-auto flex-1 flex items-center justify-end">
                <Button variant="ghost" size="icon-sm">
                    <LuInfo className="size-5 text-muted-foreground" />
                </Button>
            </div>
        </nav>
    )
}
