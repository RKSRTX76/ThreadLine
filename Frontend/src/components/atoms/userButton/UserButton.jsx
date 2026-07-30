import { LuLogOut, LuPlus, LuSettings, LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast-manager";
import { useAuth } from "@/hooks/context/useAuth"
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";

export const UserButton = () => {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();

    const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

    function OpenWOrkspaceCreateModel(){
        setOpenCreateWorkspaceModal(true);
    }

    async function handleLogut() {
        await logout;
        toast.add({
            title : "Successfully sign out",
            // description : 'You will be redirected to the signin page in a few seconds',
            type : 'success'
        });
        navigate('/signin');
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className = 'outline-none relative cursor-pointer'>
                <Avatar className='size-12' >
                    <AvatarImage src={auth?.user?.avatar} />
                    <AvatarFallback>{auth?.user?.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick = {OpenWOrkspaceCreateModel}>
                    <LuPlus className="size-4 mr-2" />
                    Create workspace
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LuUser className="size-4 mr-2" />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LuSettings className="size-4 mr-2" />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogut} >
                    <LuLogOut className="size-4 mr-2" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

