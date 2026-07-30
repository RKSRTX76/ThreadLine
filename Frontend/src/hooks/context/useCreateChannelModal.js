import { useContext } from "react"

import CreateChannelContext from "@/context/CreateChannelContext";

// this file is created to avoid redudancy
/**
 * @returns {{ openCreateChannelModal: boolean, setOpenCreateChannelModal: (open: boolean) => void }}
 */
export const useCreateChannelModal = ()=>{
    return useContext(CreateChannelContext);
};