import { createContext, useState } from "react";

export const AuthContext=createContext()

export function AuthContextProvider({children}){
    const [auth,setAuth]=useState({
        isLoggedIn:true,
        token:null,
        email:null,
    })
    const login=(token)=>{
        setAuth({
            isLoggedIn:true,
            token:token,
            email:email
        })
    }
    const logout=()=>{
        setAuth({
            isLoggedIn:false,
            token:null,
            email:null,
        })
    }

    return(
        <AuthContext.Provider value={{auth,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
