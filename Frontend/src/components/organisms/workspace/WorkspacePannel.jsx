import { LuHash, LuLoader, LuMessageSquareText, LuSendHorizontal, LuTriangleAlert } from "react-icons/lu";
import { useParams } from "react-router-dom"

import { SideBarItem } from "@/components/atoms/sidebarItem/SideBarItem";
import { UserItem } from "@/components/atoms/userItem/userItem";
import { WorkspacePanelHeader } from "@/components/molecules/workspace/WorkspacePanelHeader";
import { WorkspacePanelSection } from "@/components/molecules/workspace/WorkspacePanelSection";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import { useGetWorkspaceById } from "@/hooks/workspace/useGetWorkspaceById";

 export const WorkspacePannel = () =>{
    const {workspaceId} = useParams();

    const { setOpenCreateChannelModal } = useCreateChannelModal();

    const {workspace, isFetching, isSuccess} = useGetWorkspaceById(workspaceId);

    if(isFetching){
        return (
            <div className="flex flex-col gap-y-2 h-full items-center justify-center text-white">
                <LuLoader className="animate-spin size-6 text-white" />
            </div>
        )
    }

    if(!isSuccess){
        return (<div className="flex flex-col gap-y-2 h-full items-center justify-center text-white" >
            <LuTriangleAlert className="size-6 text-white" />
            Something went wrong
        </div>
        )
    }

    return (
        <div className="flex h-full flex-col bg-slack-medium text-[#dbdee1]" >
            <WorkspacePanelHeader workspace={workspace} />

            <div className="flex flex-col px-2 mr-1">
                <SideBarItem 
                    label='Threads'
                    icon={LuMessageSquareText}
                    channelId='threads'
                    variant='active'
                />
                <SideBarItem 
                    label='Drafts'
                    icon={LuSendHorizontal}
                    channelId='drafts'
                    variant='default'
                />
            </div>

            <WorkspacePanelSection label='Channels' onIconClick={()=> { setOpenCreateChannelModal(true)}}>

                { workspace?.channels?.map((channel) =>{
                    return <SideBarItem key={channel._id} icon={LuHash} label={channel.name} channelId={channel._id} /> 
                })}
            </WorkspacePanelSection>

            <WorkspacePanelSection 
            label='Direct Messages'
            onIconClick={ ()=> {}}
            >
                {workspace?.members?.map((item) => {
                    return <UserItem key={item.memberId._id} 
                        label={item.memberId.username}
                        id={item.memberId._id}
                        image={item.memberId.avatar}
                    />
                })}
            </WorkspacePanelSection>    

        </div>
    )
 }
