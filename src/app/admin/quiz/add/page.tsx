"use client"
import LeadText from "@/components/leadText";
import { useMutation } from "convex/react";
import Link from "next/link";
import { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { api } from "../../../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function Page() {
    const [question, setQuestion] = useState("")
    const addQuestion = useMutation(api.question.createQuestion)
    const router = useRouter();
    return (
        <div className="mt-6">
            <Link
                href="/admin/quiz"
                className={
                    "flex items-center text-xl p-2 bg-orange-300 w-max rounded-md shadow-md mb-10"
                }
            >
                <MdArrowBackIos /> Powrót do listy pytań
            </Link>
            <LeadText>Dodanie pytania</LeadText>
            <div className="bg-[#f7ba604b] px-2 py-4 flex flex-col rounded-lg gap-2">
                <div className="flex gap-2">
                    <div className="flex flex-1 flex-col rounded-xl p-3  bg-[#f7ba604b]">
                        <div className="flex justify-between items-center">
                            <span>Treść pytania</span>
                        </div>

                        <div className="flex gap-1 mt-2 ">
                            <input
                                type="text"
                                className="px-2 py-2 rounded-lg flex-1"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)} required />
                        </div>

                    </div>

                </div>



                <button
                    onClick={() => {
                        if (question.length > 0) {
                            addQuestion({ query: question })
                            router.push("/admin/quiz")

                        }
                    }}
                    className="bg-green-500 py-2 rounded-xl text-white font-bold">
                    Dodaj
                </button>
            </div>
        </div>
    )
}