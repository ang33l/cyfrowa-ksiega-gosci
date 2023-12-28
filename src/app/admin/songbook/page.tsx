"use client"
import LeadText from "@/components/leadText";
import useDebounce from "@/hooks/useDebounce";
import { usePaginatedQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useIntersection, useWindowScroll } from "@mantine/hooks";
import Song from "@/components/admin/songbook/song";
import Spinner from "@/components/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 500);
    const { results, status, loadMore } = usePaginatedQuery(
        api.songs.getSongsWithFilter,
        { filter: debouncedSearch },
        { initialNumItems: 10 }
    );
    const { ref, entry } = useIntersection();
    const [scroll, scrollTo] = useWindowScroll();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (entry?.isIntersecting) {
            loadMore(10);
        }
    }, [scroll.y])
    const router = useRouter()
    return (
        <div className="mt-6">
            <LeadText>Zarządzanie śpiewnikiem </LeadText>
            <button className="mb-1 px-4 py-2 bg-orange-300 rounded-xl" onClick={() => { router.push("/admin/songbook/add") }}>Dodaj nową piosenkę</button>
            <input type="search" placeholder="Wyszukaj..." className="border-primary  
          px-2 py-2 
          text-xl 
          bg-primary 
          focus:outline-orange-400
            w-full
          " onChange={(e) => setSearch(e.target.value)} />

            <div className="pb-2 flex flex-col gap-2 mt-2">
                {results?.map(({ song_title, song_text, _id, _creationTime }, i) => (
                    <Song key={i} song_title={song_title} song_text={song_text} _id={_id} _creationTime={_creationTime} />
                ))}
                <div> {status === "LoadingMore" ? <div className="text-2xl text-center py-4"><Spinner /></div> : status === "CanLoadMore" ? <div ref={ref}></div> : status === "Exhausted" && <div className="text-2xl text-center py-4">To wszystkie dostępne wpisy!</div>}</div>

            </div>
        </div>
    )
}