import { LuLoaderCircle } from "react-icons/lu";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@/hooks/context/useAuth";

export const ProtectedRoute = ({ children }) =>{
    const {auth} = useAuth();
    const location = useLocation();

    if(auth.isLoading){
        return <div><LuLoaderCircle className="animate-spin ml-2" /></div>
    }


    if(!auth.user || !auth.token){
        return <Navigate to='/signin' state={{ from: location }} replace />
    }

    return children;
}