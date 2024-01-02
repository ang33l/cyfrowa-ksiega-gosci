import { useEffect, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import DialogTemplate from "@/components/dialog";
import { FaTrashAlt } from "react-icons/fa";

export default function EditAnswer({ answers, setEditMode }: {
    answers: {
        _id: Id<"question_answer">;
        _creationTime: number;
        question_id: Id<"question">;
        answer: string;
        correct: boolean;
    }[] | undefined, setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [selectedAnswer, setSelectedAnswer] =
        useState<Id<"question_answer"> | undefined>(undefined);

    const [inputValues, setInputValues] = useState<string[]>([])

    useEffect(() => {
        if (!answers) return
        const temp: string[] = []
        for (let i = 0; i < answers?.length; i++) {
            if (answers[i].correct) {
                setSelectedAnswer(answers[i]._id)
            }
            temp.push(answers[i].answer)

        } setInputValues(temp)
    }, [answers])

    const updateMutation = useMutation(api.question.updateAnswers)
    const onUpdate = () => {
        if (!answers) return
        for (let i = 0; i < answers?.length; i++) {
            updateMutation({ answer_id: answers[i]._id, answer: inputValues[i], correct: selectedAnswer === answers[i]._id })
        }
        setEditMode(false)
    }

    const deleteMutation = useMutation(api.question.deleteAnswer)
    const onDelete = (_id: Id<"question_answer">) => {
        deleteMutation({ answer_id: _id })
    }

    return (
        <div className="flex flex-col gap-1">
            {
                answers?.map(
                    ({ answer, correct, _id }, i) =>
                    (
                        <div className="flex gap-1" key={i}>
                            <input type="radio"
                                className={``}

                                checked={selectedAnswer === _id}
                                id={_id}
                                name={"answers"}
                                onClick={() => { setSelectedAnswer(_id) }}

                            />
                            <input className={`${selectedAnswer === _id && "outline outline-green-400 outline-2"} p-2 rounded-lg`} defaultValue={answer} onChange={(e) => {
                                const temp = inputValues;
                                temp[i] = e.target.value
                                setInputValues(temp)
                            }} />
                            <DialogTemplate
                                onAcceptClick={() => onDelete(_id)}
                                dialog_title="Usuń odpowiedź"
                                dialog_description={correct ? "Jeśli usuniesz poprawną odpowiedź, pierwsza odpowiedź zostanie wybrana jako poprawna." : "Na pewno chcesz usunąć odpowiedź?"}
                                button_accept_text="Usuń"
                                buttonClassName=" justify-center bg-red-500 rounded-lg p-3 text-sm flex gap-2 items-center text-white"
                                button_content={<><FaTrashAlt className={"text-white"} /> Usuń</>}
                            />
                        </div>
                    )
                )
            }
            <button
                className="bg-green-400 text-white py-2 rounded-lg"
                onClick={onUpdate}>
                Zapisz zmiany
            </button>
        </div>
    )
}