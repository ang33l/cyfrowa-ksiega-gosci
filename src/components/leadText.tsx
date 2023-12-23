import localFont from "next/font/local";


export default function LeadText({ children }: { children: React.ReactNode }) {
    return <div className={`text-3xl font-bold`} style={{ textWrap: "balance" }}>
        {children}
    </div>
}
