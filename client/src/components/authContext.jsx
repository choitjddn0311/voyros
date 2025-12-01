import React, {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);

    useEffect(() => {
        const storedId = localStorage.getItem('userId');
        if(storedId) {
            setUser({id: storedId})
        }
    },[]);
    
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>  useContext(AuthContext);

