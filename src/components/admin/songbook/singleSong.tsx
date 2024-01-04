"use client"
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import DialogTemplate from "@/components/dialog";
import { useMutation } from "@tanstack/react-query";

import { Id } from "../../../../convex/_generated/dataModel";
import axios from "axios";
import { api } from "../../../../convex/_generated/api";
import { useMutation as useMutationConvex } from "convex/react";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export default function SingleSong({ _id, song_title, song_text, _creationTime }: { _id: string, song_title: string, song_text: string, _creationTime: number }) {
    const [title, setTitle] = useState(song_title)
    const [text, setText] = useState(song_text)
    const [titleEditMode, setTitleEditMode] = useState(false)
    const [textEditMode, setTextEditMode] = useState(false)
    const deleteMutation = useMutation({
        mutationFn: async () => {
            await axios.delete(`/api/delete/wish/`, { data: { wish_id: _id } })
        }
    })
    const updateSong = useMutationConvex(api.songs.updateSong)
    const router = useRouter()
    const onDelete = () => {
        deleteMutation.mutate()
        router.push("/admin/wishes")

    }

    return (<><div className="bg-[#f7ba604b] px-2 py-4 flex flex-col rounded-lg gap-2">
        <div className="flex gap-2">
            <div className="flex flex-1 flex-col rounded-xl p-3  bg-[#f7ba604b]">
                <div className="flex justify-between items-center">
                    <span>Tytuł</span>
                    <button
                        onClick={() => setTitleEditMode(!titleEditMode)}
                        className={`flex items-center gap-1 p-1 ${titleEditMode ? "bg-red-500 text-white" : "bg-orange-300"} rounded-lg shadow-sm`}>
                        {titleEditMode ? <>Anuluj<RxCross2 />
                        </> : <>Edytuj<FiEdit /></>}
                    </button>
                </div>

                {titleEditMode ?
                    <div className="flex gap-1 mt-2 ">
                        <input
                            type="text"
                            className="px-2 py-2 rounded-lg flex-1"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                        <button
                            onClick={() => {
                                setTitleEditMode(false)
                                updateSong({ song_id: _id as Id<"songbook">, song_title: title, })
                            }}
                            className="flex items-center gap-1 p-2 bg-green-500 text-white rounded-lg shadow-sm">


                            <FaCheck />
                        </button>
                    </div>

                    :
                    <span className="text-xl  font-bold">
                        {song_title}
                    </span>
                }
            </div>
            <DialogTemplate
                onAcceptClick={onDelete}
                dialog_title="Usuń wpis"
                dialog_description="Na pewno chcesz usunąć wpis?"
                button_accept_text="Usuń"
                buttonClassName="bg-[#f7ba604b] p-3 items-center justify-center rounded-xl border-none flex flex-col text-xl text-red-500"
                button_content={<><FaTrashAlt className={"text-red-500"} /> Usuń</>}
            />

        </div>


        <div className="flex flex-1 flex-col rounded-xl p-3  bg-[#f7ba604b]">

            <div className="flex justify-between items-center">
                <span>Tekst piosenki</span>
                <button
                    onClick={() => setTextEditMode(!textEditMode)}
                    className={`flex items-center gap-1 p-1 ${textEditMode ? "bg-red-500 text-white" : "bg-orange-300"} rounded-lg shadow-sm`}>
                    {textEditMode ? <>Anuluj<RxCross2 />
                    </> : <>Edytuj<FiEdit /></>}
                </button>
            </div>
            {textEditMode ?
                <div className="flex flex-col gap-1 mt-2 ">
                    <textarea
                        className="px-2 py-2 rounded-lg h-[350px]  resize-y"
                        value={text}
                        onChange={(e) => setText(e.target.value)} />
                    <button
                        onClick={() => {
                            setTextEditMode(false)
                            updateSong({ song_id: _id as Id<"songbook">, song_text: text, })
                        }}
                        className="flex justify-center items-center gap-1 p-2 bg-green-500 text-white rounded-lg shadow-sm">


                        <FaCheck />
                    </button>
                </div>
                :
                <pre className="text-xl  font-bold max-w-full overflow-auto">{song_text}</pre>
            }
        </div>
    </div>

    </>
    )
}