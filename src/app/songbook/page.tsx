"use client";
import localFont from "next/font/local";
import Link from "next/link";
import useDebounce from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Doc } from "../../../convex/_generated/dataModel";
import Spinner from "@/components/spinner";
const tnr = localFont({ src: "../../fonts/TimesNewRoman.ttf" });

export default function Search() {
    const [search, setSearch] = useState<string>("");
    const [filteredData, setFilteredData] = useState<[Doc<"songbook">] | []>([]);
    const debouncedSearch = useDebounce(search, 500);

    const songs = useQuery(api.songs.get);

    useEffect(() => {
        if (songs && songs.length !== 0) {
            const temp: any = songs.filter((item) => {
                const title = item.song_title.toLowerCase();
                const text = item.song_text.toLowerCase();
                const searchQuery = debouncedSearch.toLowerCase();
                return title.includes(searchQuery) || text.includes(searchQuery);
            });
            setFilteredData(temp);
        }
    }, [debouncedSearch]);

    return (
        <div className={`flex flex-col gap-4 w-full `}>
            <h1 className={`text-2xl text-center px-2`}>
                Wpisz tytuł lub tekst lub wyszukaj z listy poniżej!
            </h1>
            <div className={"w-full "}>
                <input
                    type="search"
                    placeholder="Wyszukaj..."
                    onChange={(e) => setSearch(e.target.value)}
                    className={`border-primary 
          px-2 py-4 
          text-3xl 
          bg-primary 
          focus:outline-orange-400
            w-full
          `}
                />
            </div>
            <div className={`${tnr.className} text-2xl flex flex-col gap-3`}>
                {!songs ? <Spinner text="Wczytywanie piosenek..." /> :

                    debouncedSearch.length === 0
                        ? songs?.map((val, i) => {
                            return (
                                <Link href={`/songbook/${val._id}`} key={i}>
                                    {i + 1}. {val.song_title}
                                </Link>
                            );
                        })
                        : filteredData.map((val, i) => {
                            return (
                                <Link href={`/songbook/${val._id}`} key={i}>
                                    {i + 1}. {val.song_title}
                                </Link>
                            );
                        })

                }
            </div>
        </div>
    );
}
