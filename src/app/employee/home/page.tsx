"use client"
import { usePaginatedQuery, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useIntersection, useWindowScroll } from "@mantine/hooks";
import LeadText from "@/components/leadText";
import Spinner from "@/components/spinner";
import EmployeeSongSuggest from "@/components/employee/suggests/songSuggest";

export default function Page() {
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 500);
    const data = useQuery(
        api.song_suggest.getSongSuggestsWithFilterForEmployee,
        { filter: debouncedSearch },
    );
    //if (!data) return <Spinner text="Wczytywanie danych..." />
    return (
        <div className="mt-6">
            <LeadText>Propozycje piosenek</LeadText>
            <input type="search" placeholder="Wyszukaj..." className="border-primary  
          px-2 py-2 
          text-xl 
          bg-primary 
          focus:outline-orange-400
            w-full
          " onChange={(e) => setSearch(e.target.value)} />
            <div className="pb-2 flex flex-col gap-2 mt-2">

                {data?.map(({ _id, _creationTime, song_name, sung }, i) => (
                    <EmployeeSongSuggest key={i} _id={_id} _creationTime={_creationTime} song_name={song_name} sung={sung} />
                ))}
            </div>
        </div>
    )
}