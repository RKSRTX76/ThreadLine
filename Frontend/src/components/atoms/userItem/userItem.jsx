import { cva } from "class-variance-authority";
import { Link } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace"
import { cn } from "@/lib/utils";


const userItemVariants = cva(
    'mt-1 flex h-9 w-full items-center justify-start gap-2 rounded-md px-2 text-sm font-medium text-[#b5bac1] hover:bg-white/8 hover:text-[#f2f3f5]',{
        variants : {
            variant : {
                default : '',
                active : 'bg-primary/20 text-[#f2f3f5]'
            }
        },
        defaultVariants : 'default'
    }
);

export const UserItem = ({id , label = 'member', image, variant = 'default'}) =>{
    
    const { workspace } = useCurrentWorkspace();
    
    return (
        <Button 
        className={cn(userItemVariants({variant}))} 
        variant="transparent"
        size="sm"
        asChild
        >
            <Link className="flex w-full min-w-0 items-center gap-2" to={`/workspace/${workspace?._id}/members/${id}`} >
                <Avatar className="size-7">
                    <AvatarImage src={image} />
                    <AvatarFallback
                        className='bg-primary text-xs font-semibold text-white'
                    >
                        {label.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <span className="min-w-0 truncate text-sm leading-none">
                    {label}
                </span>
            </Link>
        </Button>
    )
}
