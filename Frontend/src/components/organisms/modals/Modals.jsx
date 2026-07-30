import { CreateChannelModel } from "@/components/molecules/createChannelModal/CreateChannelModal"
import { CreateWorkspaceModel } from "@/components/molecules/createWorkspaceModal/CreateWorkspaceModal"
import { WorkspacePreferenceModal } from "@/components/molecules/workspace/WorkspacePreferencesModal"

export const Modals = ()=>{
    return (
        <>
            <CreateWorkspaceModel />
            <CreateChannelModel />
            <WorkspacePreferenceModal />
        </>
    )
}