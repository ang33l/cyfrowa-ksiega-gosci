"use client"

import LeadText from "@/components/leadText"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import Spinner from "@/components/spinner"
import SingleMeal from "@/components/admin/meals/SingleMeal"
import { IoAdd } from "react-icons/io5"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"

export default function Page() {
    const [mealAddMode, setMealAddMode] = useState<boolean>(false)
    const [newMeal, setNewMeal] = useState<string>("")
    const meals = useQuery(api.meal.getMeals)
    const addMutation = useMutation(api.meal.addMeal)

    if (!meals) return <Spinner text="Wczytywanie posiłków..." />
    return (
        <div className="mt-6 flex flex-col gap-2">
            <div className="flex justify-between">
                <LeadText>Menu posiłków</LeadText>
                <button
                    onClick={() => {
                        setMealAddMode(!mealAddMode)
                    }}
                    className="p-2 flex gap-1 items-center bg-orange-400 rounded-lg text-white font-bold">
                    <IoAdd className={'text-2xl'} /> Dodaj posiłek
                </button>
            </div>
            {mealAddMode &&
                <div>
                    <span>Podaj godzinę posiłku</span>
                    <div className="flex gap-1 my-2 ">
                        <input
                            type="time"
                            className="px-2 py-2 rounded-lg flex-1"
                            value={newMeal}
                            placeholder="Wpisz treść opisu..."
                            onChange={(e) => setNewMeal(e.target.value)} />
                        <button
                            onClick={() => {
                                setMealAddMode(false)
                                setNewMeal("")
                                addMutation({ meal_time: newMeal, })
                            }}
                            className="flex items-center gap-1 p-2 bg-green-500 text-white rounded-lg shadow-sm">


                            <FaCheck />
                        </button>
                    </div>
                </div>
            }
            <div className="flex flex-col gap-2">
                {meals.map((meal, i) => {
                    return <SingleMeal key={i} data={meal} />
                })}
            </div>
        </div>
    )
}