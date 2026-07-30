import { cva } from "class-variance-authority";
import { Link, useParams } from "react-router-dom"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


const sideBarItemVariants = cva(
    'flex h-8 w-full items-center justify-start gap-1.5 px-3 text-sm font-medium transition-colors',{
        variants : {
            variant : {
                default : 'text-[#b5bac1] hover:bg-white/8 hover:text-[#f2f3f5]',
                active : 'bg-primary/20 text-[#f2f3f5] hover:bg-primary/25'
            }
        },
        defaultVariants : 'default'
    }
);

export const SideBarItem = ({ label, icon : Icon , variant, channelId})=>{
    const { workspaceId } = useParams();

    return (
        <Button
            variant="transparent"
            size = 'sm'
            className={cn(sideBarItemVariants({variant}))}
        >

        <Link
            className="flex w-full items-center gap-1.5" 
            to={`/workspaces/${workspaceId}/channels/${channelId}`}
        >
            <Icon className='size-3.5 mr-1' />
            <span className="text-sm" >{label}</span>
        </Link>

        </Button>
    )
}
