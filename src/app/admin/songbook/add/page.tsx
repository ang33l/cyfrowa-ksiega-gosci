"use client"
import { useQuery, } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { notFound } from "next/navigation"
import Spinner from "@/components/spinner"
import LeadText from "@/components/leadText"
import Link from "next/link"
import { MdArrowBackIos } from "react-icons/md"
import SingleWish from "@/components/admin/wishes/singleWish"
import SingleSong from "@/components/admin/songbook/singleSong"
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