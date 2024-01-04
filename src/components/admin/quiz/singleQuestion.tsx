"use client"
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import DialogTemplate from "@/components/dialog";

import { Id } from "../../../../convex/_generated/dataModel";

import { api } from "../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import Answer from "./answer";
import EditAnswer from "./editAnswer";

export default function SingleQuestion(
    { _id, enabled, query, _creationTime }:
        {
            _id: string,
            enabled: boolean,
            query: string,
            _creationTime: number
        }) {
    const questionAnswers = useQuery(api.question.getAnswers, { question_id: _id })
    const [_query, setQuery] = useState(query)
    const [queryEditMode, setQueryEditMode] = useState(false)
    const [questionAddMode, setQuestionAddMode] = useState(false)
    const [newAnswer, setNewAnswer] = useState("")

    const [questionsEditMode, setQuestionsEditMode] = useState(false)
    const time = new Date(_creationTime);

    const updateMutation = useMutation(api.question.updateQuestion)
    const addAnswerMutation = useMutation(api.question.addAnswer)
    const router = useRouter()
    const onDelete = () => {
        //deleteMutation.mutate()
        //router.push("/admin/wishes")

    }
    const onUpdate = () => {
        updateMutation({ enabled: !enabled, question_id: _id as Id<"question"> })
    }

    return (<><div className="bg-[#f7ba604b] px-2 py-4 flex flex-col rounded-lg gap-2">

        <div className="flex gap-2">

            <button
                onClick={onUpdate}
                className={`${enabled ? "bg-green-500" : "bg-gray-400 "} flex-1 justify-center rounded-xl p-3 text-xl flex gap-2 items-center text-white`}>
                {enabled ? <><FaCheck /> Włączone </> : <><FaCheck /> Wyłączone </>}
            </button>


            <DialogTemplate
                onAcceptClick={onDelete}
                dialog_title="Usuń pytanie"
                dialog_description="Na pewno chcesz usunąć sugestię?"
                button_accept_text="Usuń"
                buttonClassName=" flex-1 justify-center bg-red-500 rounded-xl p-3 text-xl flex gap-2 items-center text-white"
                button_content={<><FaTrashAlt className={"text-white"} /> Usuń</>}
            />
        </div>

        <div className="flex flex-1 flex-col rounded-xl p-3  bg-[#f7ba604b]">
            <div className="flex justify-between items-center">
                <span>Treść pytania</span>
                <button
                    onClick={() => { setQueryEditMode(!queryEditMode) }}
                    className={`flex items-center gap-1 p-1 ${queryEditMode ? "bg-red-500 text-white" : "bg-orange-300"} rounded-lg shadow-sm`}>
                    {queryEditMode ? <>Anuluj<RxCross2 />
                    </> : <>Edytuj<FiEdit /></>}
                </button>
            </div>
            {queryEditMode ?
                <div className="flex gap-1 mt-2 ">
                    <input
                        type="text"
                        className="px-2 py-2 rounded-lg flex-1"
                        value={_query}
                        onChange={(e) => setQuery(e.target.value)} />
                    <button
                        onClick={() => {
                            setQueryEditMode(false)
                            updateMutation({ question_id: _id as Id<"question">, query: _query, })
                        }}
                        className="flex items-center gap-1 p-2 bg-green-500 text-white rounded-lg shadow-sm">


                        <FaCheck />
                    </button>
                </div>

                :
                <p className="text-xl  font-bold">{query}</p>
            }

        </div>

        <div className="flex flex-1 flex-col gap-1 rounded-xl p-3  bg-[#f7ba604b]">
            <div className="flex justify-between items-center">
                <span>Odpowiedzi</span>
                <div className="flex gap-1">
                    <button
                        onClick={() => { setQuestionAddMode(!questionAddMode) }}
                        className={`flex items-center gap-1 p-1 ${questionAddMode ? "bg-red-500" : "bg-green-500 text"} text-white rounded-lg shadow-sm`}
                    >
                        {questionAddMode ? <>Anuluj<RxCross2 />
                        </> : <>Dodaj <IoAdd /></>}
                    </button>
                    <button
                        onClick={() => { setQuestionsEditMode(!questionsEditMode) }}
                        className={`flex items-center gap-1 p-1 ${questionsEditMode ? "bg-red-500 text-white" : "bg-orange-300"} rounded-lg shadow-sm`}>
                        {questionsEditMode ? <>Anuluj<RxCross2 />
                        </> : <>Edytuj<FiEdit /></>}
                    </button>
                </div>
            </div>
            <div className="text-xl">
                {questionAddMode &&
                    <div className="flex gap-1 my-2 ">
                        <input
                            type="text"
                            className="px-2 py-2 rounded-lg flex-1"
                            value={newAnswer}
                            placeholder="Wpisz treść odpowiedzi..."
                            onChange={(e) => setNewAnswer(e.target.value)} />
                        <button
                            onClick={() => {
                                setQuestionAddMode(false)
                                setNewAnswer("")
                                addAnswerMutation({ question_id: _id as Id<"question">, answer: newAnswer, })
                            }}
                            className="flex items-center gap-1 p-2 bg-green-500 text-white rounded-lg shadow-sm">


                            <FaCheck />
                        </button>
                    </div>
                }
                {questionsEditMode ? <EditAnswer answers={questionAnswers} setEditMode={setQuestionsEditMode} />
                    :
                    <div className="flex flex-col gap-1">{
                        questionAnswers?.map(({ answer, correct, _id }, i) => {
                            return (<Answer answer={answer} correct={correct} answer_id={_id} key={i} />)
                        })
                    }</div>
                }
            </div>
        </div>
    </div>

    </>
    )
}