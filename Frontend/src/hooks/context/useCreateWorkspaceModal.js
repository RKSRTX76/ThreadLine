import { useContext } from "react"

import CreateWorkspaceContext from "@/context/CreateWorkspaceContext";

// this file is created to avoid redudancy
/**
 * @returns {{ openCreateWorkspaceModal: boolean, setOpenCreateWorkspaceModal: (open: boolean) => void }}
 */
export const useCreateWorkspaceModal = ()=>{
    return useContext(CreateWorkspaceContext);
};