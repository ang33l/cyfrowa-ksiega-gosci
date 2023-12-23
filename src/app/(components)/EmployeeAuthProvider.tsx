"use client";
import { ReactNode, createContext, useState, useContext, useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import EmployeeAuth from "@/components/employeeAuth";
//import UserAuth from "@/components/userAuth";

interface AuthContextProps {
    isAuthenticated: boolean;
    setPinCode: (pin: string) => void;
}

const EmployeeAuthContext = createContext<AuthContextProps>({ isAuthenticated: false, setPinCode: () => false });



export function EmployeeAuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [pin, setPin] = useState("");
    const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);

    const setPinCode = (pin: string) => {
        setPin(pin);
        setIsAuthenticatedAdmin(true);
        document.cookie = `employeePin=${pin}; max-age=${30 * 24 * 60 * 60}; path=/`;
    }

    return (
        <EmployeeAuthContext.Provider value={{ isAuthenticated: isAuthenticatedAdmin, setPinCode }}>
            {isAuthenticatedAdmin ? (children) : <EmployeeAuth />}
        </EmployeeAuthContext.Provider>

    )
}
export const useEmployeeAuth = (): AuthContextProps => {
    const context = useContext(EmployeeAuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
