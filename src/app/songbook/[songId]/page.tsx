"use client"
import localFont from "next/font/local";
import Link from "next/link";
const tnr = localFont({ src: "../../../fonts/TimesNewRoman.ttf" });
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { MdArrowBackIos } from "react-icons/md";
import Spinner from "@/components/spinner";
export default async function Page({ params: { songId } }: { params: { songId: string } }) {

    const song = useQuery(api.songs.single, { song_id: songId })

    return (
        <div className={tnr.className}>
            <Link
                href="/songbook"
                className={
                    "flex items-center text-xl p-2 bg-orange-300 w-max rounded-md shadow-md mb-10"
                }
            >
                <MdArrowBackIos /> Powrót do listy piosenek
            </Link>
            {!song ? <Spinner text="Wczytywanie piosenki..." /> :
                song.map((s, i) => (
                    <div key={i}>
                        <h1 className={"text-4xl font-bold pb-10"}>{s.song_title}</h1>
                        <pre className={`${tnr.className} text-3xl w-[95dvw] overflow-x-auto`}>
                            {s.song_text}
                        </pre>
                    </div>
                ))
            }

            <Link
                href="/songbook"
                className={
                    "flex items-center text-xl p-2 bg-orange-300 w-max rounded-md shadow-md mt-10"
                }
            >
                <MdArrowBackIos /> Powrót do listy piosenek
            </Link>
        </div>
    );
}
