"use client"
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import DialogTemplate from "@/components/dialog";

import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
export default function Song({ _id, song_title, song_text, _creationTime }: { _id: string, song_title: string, song_text: string, _creationTime: number }) {
    const time = new Date(_creationTime);

    const deleteMutation = useMutation(api.songs.deleteSong)
    const onDelete = () => {
        deleteMutation({ song_id: _id as Id<"songbook"> })
    }

    return (<><div className="bg-[#f7ba604b] px-2 py-4 flex flex-col rounded-lg gap-2">
        <div className="flex gap-2">
            <Link href={`/admin/songbook/${_id}`} className="flex flex-1 flex-col rounded-xl p-3  bg-[#f7ba604b]">
                <span>Tytuł</span>
                <span className="text-xl  font-bold">{song_title}</span>
            </Link>
            <Link href={`/admin/songbook/${_id}`} className=" flex-1 flex flex-col rounded-xl p-3 bg-[#f7ba604b]">
                <span>Dodane</span>
                <span className="text-xl  font-bold">{time.getHours()}:{time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()} {time.toLocaleDateString()}</span>
            </Link>
            <DialogTemplate
                onAcceptClick={onDelete}
                dialog_title="Usuń piosenkę"
                dialog_description="Na pewno chcesz usunąć piosenkę?"
                button_accept_text="Usuń"
                buttonClassName="bg-[#f7ba604b] p-3 items-center justify-center rounded-xl border-none flex flex-col text-xl text-red-500"
                button_content={<><FaTrashAlt className={"text-red-500"} /> Usuń</>}
            />

        </div>

        <Link href={`/admin/songbook/${_id}`} className="flex flex-1 flex-col rounded-xl p-3  bg-[#f7ba604b]">
            <span>Tekst piosenki</span>
            <p className="text--ellipsis text-xl  font-bold">{song_text}</p>
        </Link>

    </div>

    </>
    )
}