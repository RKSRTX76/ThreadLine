import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserButton } from "@/components/atoms/userButton/UserButton"
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { useFetchWorkspace } from "@/hooks/workspace/useFetchWorkspace"

export const Home = () =>{
     
    const navigate = useNavigate();

    const {isFetching, workspaces} = useFetchWorkspace();
    const {setOpenCreateWorkspaceModal} = useCreateWorkspaceModal();

    useEffect(()=>{
        if(isFetching) return;

        console.log('Workspace is downloaded is ', workspaces)
        
        if(!workspaces || workspaces.length === 0){
            console.log('No workspaces found, create one')
            // open create workspace modal
            setOpenCreateWorkspaceModal(true);

        }else{
            navigate(`/workspaces/${workspaces[0]._id}`);
        }

    }, [isFetching, workspaces, navigate, setOpenCreateWorkspaceModal]);


    return (
        <>
            <h1>Home</h1>
            <UserButton />
        </>
    )
}
