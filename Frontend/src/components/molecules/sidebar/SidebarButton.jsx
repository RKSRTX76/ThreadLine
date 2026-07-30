import { Button } from "@/components/ui/button"

export const SidebarButton = ({Icon, label})=>{
    return (
        <div className="group flex cursor-pointer flex-col items-center justify-center gap-y-0.5">
            <Button 
                variant="ghost"
                className="size-10 rounded-xl p-2 group-hover:bg-primary group-hover:text-white"
            >
                <Icon className='size-5 text-[#b5bac1] transition-all group-hover:scale-110 group-hover:text-white' />
            </Button>
            <span className="text-[10px] font-medium text-[#b5bac1] group-hover:text-white">
                {label}
            </span>
        </div>
    )
}
