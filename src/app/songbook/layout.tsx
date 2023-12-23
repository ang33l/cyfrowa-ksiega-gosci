import Header from "@/components/header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main
                className={
                    "py-28 px-2 flex flex-col items-center justify-center max-w-xl	m-auto"
                }
            >
                {children}
            </main>
        </>
    );
}
