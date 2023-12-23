import Header from "@/components/header";
import localFont from "next/font/local";
import { AdminAuthProvider } from "../(components)/AdminAuthProvider";
import AdminHeader from "@/components/header/adminHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminAuthProvider>
            <AdminHeader />
            <main
                className={
                    `px-2 flex flex-col justify-center max-w-xl	m-auto `
                }
            >
                {children}
            </main>
        </AdminAuthProvider>
    );
}
