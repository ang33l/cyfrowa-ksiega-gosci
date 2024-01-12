"use client"
import DialogTemplate from "@/components/dialog";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "react-toastify";

export default function AdminPin() {
    const [newGuestPassword, setNewGuestPassword] = useState("")
    const [newGuestPasswordRepeat, setNewGuestPasswordRepeat] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const updatePassword = useMutation(api.passwords.updateGuestPassword)
    const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!newGuestPassword || !newGuestPasswordRepeat) {
            e.preventDefault()
            setErrorMessage("Wypełnij wszystkie pola!")
        }
        if (newGuestPassword !== newGuestPasswordRepeat) {
            e.preventDefault()
            setErrorMessage("Hasła nie są takie same!")
        }
        if (newGuestPassword.length < 4) {
            e.preventDefault()
            setErrorMessage("Hasło musi mieć minimum 4 znaki!")
        }
        updatePassword({ password: newGuestPassword }).finally(() => {
            toast.success("Zmieniono PIN dla gości")
        })
        setErrorMessage("")

    }
    return (
        <DialogTemplate
            onAcceptClick={onDelete}
            dialog_title="Zmiana PINu dla administratora"
            dialog_description={
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <label className="text-gray-500 bg-[#9c763d42]">Nowy PIN</label>
                        <input type="password" onChange={e => setNewGuestPassword(e.target.value)} placeholder="Podaj PIN" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-500">Potwierdź nowy PIN</label>
                        <input type="password" onChange={e => setNewGuestPasswordRepeat(e.target.value)} placeholder="Powtórz" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </div>
            }
            button_accept_text="Zatwierdź"
            buttonClassName=" flex-1  bg-[#9c763d42] rounded-xl p-3 text-xl flex gap-2 items-center text-white"
            button_content={<>Zmień hasło administratora</>}
        />
    )
}
