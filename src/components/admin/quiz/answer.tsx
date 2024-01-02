import DialogTemplate from "@/components/dialog";
import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { FaTrashAlt } from "react-icons/fa";

export default function Answer({ answer_id, answer, correct }: { answer_id: Id<"question_answer">, answer: string, correct: boolean }) {
    const deleteMutation = useMutation(api.question.deleteAnswer)
    const onDelete = (_id: Id<"question_answer">) => {
        deleteMutation({ answer_id: _id })
    }

    return <div
        className={`flex items-center gap-2`}>
        <DialogTemplate
            onAcceptClick={() => onDelete(answer_id)}
            dialog_title="Usuń odpowiedź"
            dialog_description={correct ? "Jeśli usuniesz poprawną odpowiedź, pierwsza odpowiedź zostanie wybrana jako poprawna." : "Na pewno chcesz usunąć odpowiedź?"}
            button_accept_text="Usuń"
            buttonClassName=" justify-center bg-red-500 rounded-lg p-3 text-sm flex gap-2 items-center text-white"
            button_content={<><FaTrashAlt className={"text-white"} /> Usuń</>}
        />
        <p className={`${correct && "italic"}`}>
            {correct && "(Poprawna) "}
            {answer}
        </p>

    </div>
}