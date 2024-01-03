"use client"

import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import Spinner from "@/components/spinner";
import QuestionWithAnswers from "@/components/quiz/question";
import LeadText from "@/components/leadText";
import { useRouter } from "next/navigation";

export default function Page() {
    const [quizUid, setQuizUid] = useState<string>("");
    const [answers, setAnswers] = useState<{ question_id: string, answer_id: string | undefined }[]>([])
    const [notAllSelectedError, setNotAllSelectedError] = useState<boolean>(false)
    const router = useRouter();
    useEffect(() => {
        const existingPinCookie = document.cookie.replace(/(?:(?:^|.*;\s*)quizUid\s*=\s*([^;]*).*$)|^.*$/, "$1");
        if (existingPinCookie) {
            setQuizUid(existingPinCookie)
        } else {
            fetch("/api/get/quizUid")
                .then(res => res.json())
                .then(res => {
                    setQuizUid(res.uid)
                    document.cookie = `quizUid=${res.uid}; max-age=${24 * 60 * 60}; path=/`;
                })
        }
    }, [])

    const questions = useQuery(api.quiz.getQuestions, { quiz_uid: quizUid })
    useEffect(() => {
        if (!questions) return
        if (answers.length > 0) return
        const temp: { question_id: string, answer_id: string | undefined }[] = []
        for (let i = 0; i < questions.length; i++) {
            temp.push({ question_id: questions[i].question._id, answer_id: undefined })
        }
        setAnswers(temp)

    }, [questions])


    if (!questions) return <Spinner text="Wczytywanie pytań..." />
    return <div className={'flex flex-col gap-3'}>
        <LeadText>Wypełnij formularz</LeadText>
        <div className="flex flex-col gap-2">
            {questions.map((question, i) =>
                <QuestionWithAnswers key={i} index={i} data={question} setAnswers={setAnswers} />
            )}
        </div>
        {notAllSelectedError && <p className="text-red-500">Nie wszystkie pytania zostały wypełnione!</p>}
        <button className="bg-primary rounded-lg p-2 font-bold" onClick={() => {
            for (let i = 0; i < answers.length; i++) {
                if (!answers[i].answer_id) {
                    setNotAllSelectedError(true)
                    return
                }
            }
            setNotAllSelectedError(false)
            fetch("/api/send/quiz/", {
                method: "POST",
                body: JSON.stringify({ quizUid, answers })
            }).then(res => res.json()).then(res => {
                if (res.type === "success") {
                    router.push(`/quiz/summary/${quizUid}`)
                }

            })
        }}>Podsumuj</button>
    </div>
}