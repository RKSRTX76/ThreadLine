import { LuBell, LuEllipsis, LuHouse, LuMessageSquare } from "react-icons/lu"

import { UserButton } from "@/components/atoms/userButton/UserButton"
import { SidebarButton } from "@/components/molecules/sidebar/SidebarButton"

import { WorkspaceSwitcher } from "./WorkspaceSwitcher"

export const WorkspaceSideBar = ()=>{
    return (
        <aside
            className="flex h-full w-[72px] flex-col items-center gap-y-4 border-r border-black/30 bg-slack-dark pb-3 pt-3"
        >
            <WorkspaceSwitcher />

            <SidebarButton 
                Icon = {LuHouse}
                label = "Home"
            />

            <SidebarButton 
                Icon = {LuMessageSquare}
                label = "DM"
            />

            <SidebarButton 
                Icon = {LuBell}
                label = "Notification"
            />

            <SidebarButton 
                Icon = {LuEllipsis}
                label = "More"
            />

            <div className="flex flex-col items-center justify-center mt-auto gap-y-1 mb-5">
                <UserButton />
            </div>

        </aside>
    )
}
