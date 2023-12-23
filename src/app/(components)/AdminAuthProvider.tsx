"use client";
import { ReactNode, createContext, useState, useContext, useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import AdminAuth from "@/components/adminAuth";
//import UserAuth from "@/components/userAuth";

interface AuthContextProps {
    isAuthenticated: boolean;
    setPinCode: (pin: string) => void;
}

const AdminAuthContext = createContext<AuthContextProps>({ isAuthenticated: false, setPinCode: () => false });



export function AdminAuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [pin, setPin] = useState("");
    const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);

    const setPinCode = (pin: string) => {
        setPin(pin);
        setIsAuthenticatedAdmin(true);
        document.cookie = `adminPin=${pin}; max-age=${30 * 24 * 60 * 60}; path=/`;
    }

    return (
        <AdminAuthContext.Provider value={{ isAuthenticated: isAuthenticatedAdmin, setPinCode }}>
            {isAuthenticatedAdmin ? (children) : <AdminAuth />}
        </AdminAuthContext.Provider>

    )
}
export const useAdminAuth = (): AuthContextProps => {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
