import LeadText from "@/components/leadText";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <LeadText>Rozwiąż quiz o parze młodej!</LeadText>
            <div className="flex justify-center my-4">
                <Link className="py-4 px-6 rounded-lg text-xl font-bold bg-orange-400 text-white" href="/quiz/solve">Start</Link>
            </div>
        </>
    )
}