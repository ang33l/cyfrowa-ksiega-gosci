"use client"
import LeadText from "@/components/leadText"
import Link from "next/link"
import { MdArrowBackIos } from "react-icons/md"
import AddSong from "@/components/admin/songbook/add"

export default function Page() {
    return (
        <div className="mt-6">
            <Link
                href="/admin/songbook"
                className={
                    "flex items-center text-xl p-2 bg-orange-300 w-max rounded-md shadow-md mb-10"
                }
            >
                <MdArrowBackIos /> Powrót do listy piosenek
            </Link>
            <LeadText>Dodanie piosenki</LeadText>
            <AddSong />
        </div>
    )
}