"use client"
import { useQuery, } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import Spinner from "@/components/spinner"
import Link from "next/link"
import { MdArrowBackIos } from "react-icons/md"
import SingleSong from "@/components/admin/songbook/singleSong"

export default function Page({ params: { songId } }: { params: { songId: string } }) {
    const song = useQuery(api.songs.single, { song_id: songId })
    if (!song) return <Spinner text="Wczytywanie życzenia..." />
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
            <SingleSong
                _id={song[0]._id}
                song_title={song[0].song_title}
                song_text={song[0].song_text}
                _creationTime={song[0]._creationTime} />

        </div>
    )
}