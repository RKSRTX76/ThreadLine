import { useState } from "react"
import { LuChevronDown, LuChevronRight, LuPlus } from "react-icons/lu";

import { Button } from "@/components/ui/button";

export const WorkspacePanelSection = ({children, label, onIconClick})=>{
    const [open, setOpen] = useState(true);

    return (
        <div className="mt-5 flex flex-col px-2">
            <div className="group flex items-center px-1">

                <Button
                    onClick = { ()=> setOpen(!open)}
                    variant="ghost"
                    className='size-6 p-0.5 text-[#b5bac1]'
                >
                    {open ? <LuChevronDown className="size-4" /> : <LuChevronRight className="size-4" /> }
                </Button>
                <Button
                    variant="ghost"
                    className='h-8 flex-1 justify-start px-1 text-xs font-bold uppercase tracking-wide text-[#b5bac1]'
                >
                    <span>{label}</span>
                </Button>

                {onIconClick && 
                    <Button
                        onClick = {onIconClick}
                        variant="ghost"
                        size="iconSm"
                        className='ml-auto size-7 p-0.5 text-[#b5bac1] opacity-0 transition-opacity group-hover:opacity-100'
                    >
                        <LuPlus className="size-4" />

                    </Button>
                }
            </div>
                {open && children}
        </div>
    )
}
