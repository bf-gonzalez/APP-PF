"use client";
import { ILoginUser, ILoginUserResponse, IUser, IUserContext } from "@/interface/index";
import { postRegister, postLogin } from "@/lib/server/fetchUser";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext<IUserContext>({
    user: null,
    setUser: () => {},
    isLogged: false,
    setIsLogged: () => {},
    signIn: async () => false,
    signUp: async () => false,
    logOut: () => {},
});


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Partial<ILoginUserResponse> | null>(null);
    const [isLogged, setIsLogged] = useState(false);

    const signUp = async (user: Omit<IUser, "id">) => {
        console.log('entró');
        
        try {
            const data = await postRegister(user);
            if (data.id) {
                signIn({ email: user.email, password: user.password });
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const signIn = async (credentials: ILoginUser) => {
        try {
            const data = await postLogin(credentials);
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("token", data.token);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

 
    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setIsLogged(false);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogged(true);
        }
    }, [user]);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
            return;
        }
        setUser(null);
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                isLogged,
                setIsLogged,
                signIn,
                signUp,
                logOut,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
