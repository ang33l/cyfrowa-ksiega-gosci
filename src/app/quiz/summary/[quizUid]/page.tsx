"use client"
import { useQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "../../../../../convex/_generated/api";
import Spinner from "@/components/spinner";
import LeadText from "@/components/leadText";
import SummaryQuestion from "@/components/quiz/summaryQuestion";
import Link from "next/link";

export default function Page(
    { params: { quizUid } }: { params: { quizUid: string } }) {
    useEffect(() => {
        const existingPinCookie = document.cookie.replace(/(?:(?:^|.*;\s*)quizUid\s*=\s*([^;]*).*$)|^.*$/, "$1");
        if (existingPinCookie) {
            document.cookie = `quizUid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
    }, [])
    const questions = useQuery(api.quiz.getSummary, { quiz_uid: quizUid })
    if (!questions) return <Spinner text={"Wczytywanie danych..."} />

    return <div className={'flex flex-col gap-3'}>
        <LeadText>Podsumowanie</LeadText>
        <div className="flex flex-col gap-2">
            {questions.map((question, i) =>
                <SummaryQuestion index={i} data={question} key={i} quizUid={quizUid} />
            )}
        </div>
        <Link href={"/"} className="text-center bg-primary rounded-lg p-2 font-bold">
            Powrót do strony głównej
        </Link>
    </div>

}
