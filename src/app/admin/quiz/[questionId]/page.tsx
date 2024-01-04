"use client"
import { useQuery, } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import Spinner from "@/components/spinner"
import Link from "next/link"
import { MdArrowBackIos } from "react-icons/md"
import SingleQuestion from "@/components/admin/quiz/singleQuestion"

export default function Page({ params: { questionId } }: { params: { questionId: string } }) {
    const song = useQuery(api.question.single, { question_id: questionId })
    if (!song) return <Spinner text="Wczytywanie pytania..." />
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
            <SingleQuestion
                _id={song[0]._id}
                query={song[0].query}
                enabled={song[0].enabled}
                _creationTime={song[0]._creationTime} />

        </div>
    )
}