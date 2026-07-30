import { useEffect } from "react";
import { useDefaultLayout } from "react-resizable-panels";
import { useNavigate, useParams } from "react-router-dom";

import { WorkspaceNavbar } from "@/components/organisms/workspace/WorkspaceNavbar"
import { WorkspacePannel } from "@/components/organisms/workspace/WorkspacePannel";
import { WorkspaceSideBar } from "@/components/organisms/workspace/WorkspaceSidebar"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { useGetWorkspaceById } from "@/hooks/workspace/useGetWorkspaceById";

export const WorkspaceLayout = ({children})=>{
    const { workspaceId, channelId } = useParams();
    const navigate = useNavigate();
    const { workspace, isSuccess } = useGetWorkspaceById(workspaceId);

    const { defaultLayout, onLayoutChanged } = useDefaultLayout({
        id : "workspace-resize",
        panelIds : ["workspace-sidebar", "workspace-content"]
    });

    useEffect(() => {
        if (!channelId && isSuccess && workspace?.channels?.length > 0) {
            navigate(`/workspaces/${workspaceId}/channels/${workspace.channels[0]._id}`, { replace: true });
        }
    }, [channelId, isSuccess, workspace, workspaceId, navigate]);

    return (
        <div className="h-[100vh] overflow-hidden bg-background">
            <WorkspaceNavbar />

            <div className="flex h-[calc(100vh-48px)]">
                <WorkspaceSideBar />

                <ResizablePanelGroup
                    className="flex-1"
                    orientation="horizontal"
                    defaultLayout={defaultLayout}
                    onLayoutChanged={onLayoutChanged}
                >
                    <ResizablePanel
                        id="workspace-sidebar"
                        defaultSize="20%"
                        minSize="12%"
                        maxSize ="25%"
                        className="bg-slack-medium"
                    >
                        <WorkspacePannel />
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    <ResizablePanel
                        id="workspace-content"
                        minSize="20%"
                    >
                        {children}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    )
}
