"use client"
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
export default function AddSong() {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [error, setError] = useState("")
    const addSong = useMutation(api.songs.addSong)
    const router = useRouter()


    return (<><div className="bg-[#f7ba604b] px-2 py-4 flex flex-col rounded-lg gap-2">
        <div className="flex gap-2">
            <div className="flex flex-1 flex-col rounded-xl p-3  bg-[#f7ba604b]">
                <div className="flex justify-between items-center">
                    <span>Tytuł</span>
                </div>

                <div className="flex gap-1 mt-2 ">
                    <input
                        type="text"
                        className="px-2 py-2 rounded-lg flex-1"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} required />
                </div>

            </div>

        </div>


        <div className="flex flex-1 flex-col rounded-xl p-3  bg-[#f7ba604b]">

            <div className="flex justify-between items-center">
                <span>Tekst piosenki</span>
            </div>
            <div className="flex flex-col gap-1 mt-2 ">
                <textarea
                    className="px-2 py-2 rounded-lg h-[350px]  resize-y"
                    value={text}
                    onChange={(e) => setText(e.target.value)} required />

            </div>

        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
            onClick={(e) => {

                if (title.length > 0 && text.length > 0) {
                    addSong({ song_title: title, song_text: text })
                    router.push("/admin/songbook")
                } else {
                    setError("Wypełnij wszystkie pola!")
                }
            }}
            className="bg-green-500 py-2 rounded-xl text-white font-bold">
            Zapisz
        </button>
    </div>

    </>
    )
}