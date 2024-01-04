import Header from "@/components/header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main
                className={
                    `px-2 flex flex-col justify-center max-w-xl	m-auto `
                }
            >
                {children}
            </main>
        </>
    );
}
