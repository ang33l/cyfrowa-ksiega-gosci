"use client"
import LeadText from "@/components/leadText";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";

export default function Page() {
    const [name, setName] = useState<string>("")
    const [isSent, setIsSent] = useState(false);

    const addSong = useMutation(api.song_suggest.addSong)

    const submitSong = () => {
        if (name.length === 0) return
        addSong({ song_name: name })
        setIsSent(true)
        setName("")
    }

    return (
        <div className="flex flex-col gap-2">
            <LeadText>Dodaj propozycję piosenki do zagrania</LeadText>
            <div className="flex flex-col">
                <label htmlFor="name" className="text-xl">Nazwa piosenki</label>
                <input value={name} onChange={e => setName(e.target.value)} className="bg-[#f7ba604b] text-black rounded-lg text-xl px-2 py-2 bg-[" placeholder="Wpisz tutaj..." id="name" />
            </div>
            {isSent && <div className="text-2xl text-center py-4">Dziękujemy za propozycję!</div>}
            <button onClick={submitSong} disabled={name.length === 0} className={`py-2 ${name.length === 0 ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-orange-300"} rounded-lg text-xl shadow-sm`}>Prześlij propozycję</button>
        </div>
    )
}