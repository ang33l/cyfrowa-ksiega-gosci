"use client";
import { ReactNode, createContext, useState, useContext, useEffect } from "react";
import UserAuth from "@/components/userAuth";

interface AuthContextProps {
    isAuthenticated: boolean;
    setPinCode: (pin: string) => void;
}

const UserAuthContext = createContext<AuthContextProps>({ isAuthenticated: false, setPinCode: () => false });



export function UserAuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [pin, setPin] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setPinCode = (pin: string) => {
        setPin(pin);
        setIsAuthenticated(true);
        document.cookie = `guestPin=${pin}; max-age=${30 * 24 * 60 * 60}; path=/`;
    }

    return (
        <UserAuthContext.Provider value={{ isAuthenticated, setPinCode }}>
            {isAuthenticated ? (children) : <UserAuth />}
        </UserAuthContext.Provider>

    )
}
export const useUserAuth = (): AuthContextProps => {
    const context = useContext(UserAuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
