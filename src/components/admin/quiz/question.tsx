"use client"
import Link from "next/link";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import DialogTemplate from "@/components/dialog";

import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
export default function Question({ _id, query, enabled, _creationTime }: { _id: string, query: string, enabled: boolean, _creationTime: number }) {
    const time = new Date(_creationTime);
    const updateMutation = useMutation(api.question.updateQuestion)
    //const deleteMutation = useMutation(api.songs.deleteSong)
    const onDelete = () => {
        //TODO: delete
        //deleteMutation({ song_id: _id as Id<"songbook"> })
    }
    const onUpdate = () => {
        updateMutation({ enabled: !enabled, question_id: _id as Id<"question"> })
    }

    return (<><div className="bg-[#f7ba604b] px-2 py-4 flex flex-col rounded-lg gap-2">
        <Link href={`/admin/quiz/${_id}`} className="">
            <div className="flex flex-1 flex-col rounded-xl p-3  bg-[#f7ba604b]">
                <span>Treść pytania</span>
                <p className="text--ellipsis text-xl  font-bold">{query}</p>
            </div>


        </Link>


        <div className="flex flex-col rounded-xl p-3  bg-[#f7ba604b]">
            <span>Akcje</span>
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
        </div>
    </div>

    </>
    )
}