import { useContext } from "react"

import AuthContext from "@/context/AuthContext"

// this file is created to avoid redudancy
export const useAuth = ()=>{
    return useContext(AuthContext);
};