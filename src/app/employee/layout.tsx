import Header from "@/components/header";
import { EmployeeAuthProvider } from "../(components)/EmployeeAuthProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <EmployeeAuthProvider>
            <Header />
            <main
                className={
                    `px-2 flex flex-col justify-center max-w-xl	m-auto `
                }
            >
                {children}
            </main>
        </EmployeeAuthProvider>
    );
}
