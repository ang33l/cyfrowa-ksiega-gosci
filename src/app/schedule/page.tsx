"use client"
import ScheduleEvent from "@/components/schedule/event";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Spinner from "@/components/spinner";

export default function Page() {
    const events = useQuery(api.schedule.getSchedule)
    if (!events) return <Spinner text="Wczytywanie harmonogramu..." />
    return (<>
        <h1 className="text-3xl">Harmonogram wesela</h1>
        <p>14.08.2023r.</p>
        <div className="flex flex-col">
            {events.map((event, i) => {
                return <ScheduleEvent key={i} index={i} time={event.time} description={event.description} />
            })}

        </div>
    </>)
}