"use client"
import MenuOption from "@/components/mealsMenu/menuOption";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Spinner from "@/components/spinner";

export default function Page() {
    const menu = useQuery(api.meal.getMeals)
    if (!menu) return <Spinner text="Wczytywanie menu..." />
    return (<>
        <h1 className="text-3xl">Menu posiłków</h1>
        <p>14.08.2023r.</p>
        <div className="flex flex-col">
            {menu.map((meal, i) => {
                return <MenuOption index={i} time={meal.meal_time} description={meal.meals} />

            })}

        </div>
    </>)
}