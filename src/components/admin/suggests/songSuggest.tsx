"use client"
import { FaTrashAlt } from "react-icons/fa";
import DialogTemplate from "@/components/dialog";

import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { useMutation, } from "convex/react";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa6";

export default function SongSuggest({ _id, song_name, sung, _creationTime }: { _id: string, song_name: string, sung: boolean, _creationTime: number }) {
    const time = new Date(_creationTime);
    // const deleteMutation = useMutation({
    //     mutationFn: async () => {
    //         await axios.delete(`/api/delete/song_suggest/`, { data: { song_id: _id } })
    //     }
    // }) mutation convex
    const updateMutation = useMutation(api.song_suggest.updateSongState)
    const deleteMutation = useMutation(api.song_suggest.deleteSong)
    const router = useRouter()
    const onUpdate = () => {
        updateMutation({ sung: !sung, song_id: _id as Id<"song_suggest"> })
    }
    const onDelete = () => {
        deleteMutation({ song_id: _id as Id<"song_suggest"> })
    }

    return (<><div className="bg-[#f7ba604b] px-2 py-4 flex flex-col rounded-lg gap-2">

        <div className=" flex flex-col rounded-xl p-3  bg-[#f7ba604b]">
            <span>Nazwa utworu</span>
            <p className="text--ellipsis text-xl font-bold">{song_name}</p>
        </div>





        <div className="flex flex-col rounded-xl p-3  bg-[#f7ba604b]">
            <span>Akcje</span>
            <div className="flex gap-2">

                <button
                    onClick={onUpdate}
                    className={`${sung ? "bg-gray-400 " : "bg-green-500"}  justify-center rounded-xl p-3 text-xl flex gap-2 items-center text-white`}>
                    <FaCheck /> Oznacz jako {sung && "nie"}zagrane
                </button>


                <DialogTemplate
                    onAcceptClick={onDelete}
                    dialog_title="Usuń sugestię"
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