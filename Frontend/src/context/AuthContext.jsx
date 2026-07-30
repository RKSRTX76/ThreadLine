import { createContext, useState } from "react";

const AuthContext = createContext();

const getInitialAuth = () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!user || !token) {
        return { user: null, token: null, isLoading: false };
    }

    try {
        return { user: JSON.parse(user), token, isLoading: false };
    } catch {
        localStorage.removeItem('user');
        return { user: null, token: null, isLoading: false };
    }
};

// insted of fetching token and user info each time from local storage , fetch once 
// and store it so we do not need to fetch again from local storage always
export const AuthContextProvider = ({ children }) =>{
    const [auth, setAuth] = useState(getInitialAuth);

    async function logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setAuth({
            user : null,
            token : null,
            isLoading : false
        })
    }

    return (
        <AuthContext.Provider value={{auth, setAuth, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;
