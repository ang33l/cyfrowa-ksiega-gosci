"use client"

import LeadText from "@/components/leadText"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import Spinner from "@/components/spinner"
import { IoAdd } from "react-icons/io5"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import SingleEvent from "@/components/admin/schedule/singleEvent"

export default function Page() {
    const [eventAddMode, setEventAddMode] = useState<boolean>(false)
    const [newEvent, setNewEvent] = useState<string>("")
    const [newEventDescription, setNewEventDescription] = useState<string>("")
    const events = useQuery(api.schedule.getSchedule)
    const addMutation = useMutation(api.schedule.addEvent)

    if (!events) return <Spinner text="Wczytywanie harmonogramu..." />

    return (
        <div className="mt-6 flex flex-col gap-2">
            <div className="flex justify-between">
                <LeadText>Harmonogram</LeadText>
                <button
                    onClick={() => {
                        setEventAddMode(!eventAddMode)
                    }}
                    className="p-2 flex gap-1 items-center bg-orange-400 rounded-lg text-white font-bold">
                    <IoAdd className={'text-2xl'} /> Dodaj wydarzenie
                </button>
            </div>
            {eventAddMode &&
                <div>
                    <span>Uzupełnij formularz</span>
                    <div className="flex flex-col gap-1 my-2 ">
                        <input
                            type="time"
                            className="px-2 py-2 rounded-lg flex-1"
                            value={newEvent}
                            placeholder="Wpisz godzinę..."
                            onChange={(e) => setNewEvent(e.target.value)} />
                        <input
                            type="text"
                            className="px-2 py-2 rounded-lg flex-1"
                            value={newEventDescription}
                            placeholder="Wpisz treść opisu..."
                            onChange={(e) => setNewEventDescription(e.target.value)} />
                        <button
                            onClick={() => {
                                setEventAddMode(false)
                                setNewEvent("")
                                setNewEventDescription("")
                                addMutation({ time: newEvent, description: newEventDescription })
                            }}
                            className="flex self-center items-center gap-1 p-2 bg-green-500 text-white rounded-lg shadow-sm">

                            Dodaj
                            <FaCheck />
                        </button>
                    </div>
                </div>
            }
            <div className="flex flex-col gap-2">
                {events.map((event, i) => {
                    return <SingleEvent key={i} data={event} />
                })}
            </div>
        </div>
    )
}