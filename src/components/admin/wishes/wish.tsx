"use client"
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import DialogTemplate from "@/components/dialog";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";
export default function Wish({ _id, wish_author, wish_content, _creationTime }: { _id: string, wish_author: string, wish_content: string, _creationTime: number }) {
    const time = new Date(_creationTime);

    const deleteMutation = useMutation({
        mutationFn: async () => {
            await axios.delete(`/api/delete/wish/`, { data: { wish_id: _id } })
        }
    })
    const onDelete = () => {
        deleteMutation.mutate()
        //deleteFunction({ wish_id: _id as Id<"wish"> })
    }

    return (<><div className="bg-[#f7ba604b] px-2 py-4 flex flex-col rounded-lg gap-2">
        <div className="flex gap-2">
            <Link href={`/admin/wishes/${_id}`} className="flex flex-1 flex-col rounded-xl p-3  bg-[#f7ba604b]">
                <span>Autor</span>
                <span className="text-xl  font-bold">{wish_author}</span>
            </Link>
            <Link href={`/admin/wishes/${_id}`} className=" flex-1 flex flex-col rounded-xl p-3 bg-[#f7ba604b]">
                <span>Dodane</span>
                <span className="text-xl  font-bold">{time.getHours()}:{time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()} {time.toLocaleDateString()}</span>
            </Link>
            <DialogTemplate
                onAcceptClick={onDelete}
                dialog_title="Usuń wpis"
                dialog_description="Na pewno chcesz usunąć wpis?"
                button_accept_text="Usuń"
                buttonClassName="bg-[#f7ba604b] p-3 items-center justify-center rounded-xl border-none flex flex-col text-xl text-red-500"
                button_content={<><FaTrashAlt className={"text-red-500"} /> Usuń</>}
            />

        </div>

        <Link href={`/admin/wishes/${_id}`} className="flex flex-1 flex-col rounded-xl p-3  bg-[#f7ba604b]">
            <span>Treść życzeń</span>
            <p className="text--ellipsis text-xl  font-bold">{wish_content}</p>
        </Link>

    </div>

    </>
    )
}