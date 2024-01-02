"use client"
import Stat from "@/components/admin/home/stat";
import LeadText from "@/components/leadText";
import { useQuery } from "convex/react";
import { IoStatsChartSharp } from "react-icons/io5";
import { api } from "../../../../convex/_generated/api";

export default function Page() {
    const wishes = useQuery(api.wishes.getWishesCount)
    const media = useQuery(api.files.getFilesCount)
    const suggests = useQuery(api.song_suggest.getSongSuggestsCount)
    return (
        <div className="mt-6">
            <LeadText>
                Witaj w panelu administatora!
            </LeadText>
            <div className="border-b my-6"> </div>
            <div>
                <h2 className="flex items-center gap-2 text-xl pb-2">
                    <IoStatsChartSharp />
                    Statystyki
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {wishes ?
                        <Stat name={"Złożonych życzeń"} counter={wishes} />
                        :
                        <Stat name={"Złożonych życzeń"} loading={true} />
                    }
                    {media ?
                        <Stat name={"Przesłanych plików"} counter={media} />
                        :
                        <Stat name={"Przesłanych plików"} loading={true} />
                    }
                    {suggests ?
                        <Stat name={"Niezagranych sugestii piosenek"} counter={suggests} />
                        :
                        <Stat name={"Niezagranych sugestii piosenek"} loading={true} />
                    }
                </div>

            </div>
        </div>
    )
}