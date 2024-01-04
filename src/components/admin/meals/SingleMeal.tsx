import DialogTemplate from "@/components/dialog";
import { Id } from "../../../../convex/_generated/dataModel";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import MealDescription from "./description";
import { IoAdd } from "react-icons/io5";

export default function SingleMeal({ data }: {
    data: {
        meal_id: Id<"menu_meal">;
        meal_time: string;
        meals: {
            _id: Id<"meal_description">;
            _creationTime: number;
            meal_description: string;
            menu_meal_id: Id<"menu_meal">;
        }[];
    }
}) {
    const [hourEditMode, setHourEditMode] = useState(false)
    const [hour, setHour] = useState(data.meal_time)
    const [descriptionAddMode, setDescriptionAddMode] = useState(false)
    const [newDescription, setNewDescription] = useState("")
    const deleteMutation = useMutation(api.meal.deleteMeal)
    const updateMealTime = useMutation(api.meal.updateMealTime)
    const addDescriptionMutation = useMutation(api.meal.addMealDescription)
    const onDelete = () => {
        deleteMutation({ meal_id: data.meal_id })
    }
    return <div className="bg-[#f7ba604b] p-2 rounded-lg flex flex-col gap-2">
        <div className="flex gap-2">
            <div className="bg-[#f7ba604b] rounded-lg p-2 flex-[4] flex flex-col">

                <div className="flex justify-between items-center">
                    <span>Godzina</span>
                    <button
                        onClick={() => setHourEditMode(!hourEditMode)}
                        className={`flex items-center gap-1 p-1 ${hourEditMode ? "bg-red-500 text-white" : "bg-orange-300"} rounded-lg shadow-sm`}>
                        {hourEditMode ? <>Anuluj<RxCross2 />
                        </> : <>Edytuj<FiEdit /></>}
                    </button>
                </div>
                {hourEditMode ?
                    <div className="flex gap-1 mt-2 ">
                        <input
                            type="time"
                            className="px-2 py-2 rounded-lg flex-1"
                            defaultValue={data.meal_time}
                            onChange={(e) => setHour(e.target.value)} />
                        <button
                            onClick={() => {
                                setHourEditMode(false)
                                updateMealTime({ meal_id: data.meal_id, meal_time: hour })
                            }}
                            className="flex items-center gap-1 p-2 bg-green-500 text-white rounded-lg shadow-sm">


                            <FaCheck />
                        </button>
                    </div>

                    :
                    <span className="text-xl  font-bold">
                        {data.meal_time}
                    </span>
                }
            </div>
            <DialogTemplate
                onAcceptClick={onDelete}
                dialog_title="Usuń posiłek"
                dialog_description="Na pewno chcesz usunąć tę pozycję z menu?"
                button_accept_text="Usuń"
                buttonClassName=" flex-1 justify-center bg-red-500 rounded-xl p-3 text-xl flex gap-2 items-center text-white"
                button_content={<><FaTrashAlt className={"text-white"} /> Usuń</>}
            />
        </div>
        <div className="bg-[#f7ba604b] p-2 rounded-lg">
            <div className="flex justify-between items-center">
                <span>Opis</span>
                <button
                    onClick={() => { setDescriptionAddMode(!descriptionAddMode) }}
                    className={`flex items-center gap-1 p-1 ${descriptionAddMode ? "bg-red-500" : "bg-green-500 text"} text-white rounded-lg shadow-sm`}
                >
                    {descriptionAddMode ? <>Anuluj<RxCross2 />
                    </> : <>Dodaj <IoAdd /></>}
                </button>
            </div>
            {descriptionAddMode &&
                <div className="flex gap-1 my-2 ">
                    <input
                        type="text"
                        className="px-2 py-2 rounded-lg flex-1"
                        value={newDescription}
                        placeholder="Wpisz treść opisu..."
                        onChange={(e) => setNewDescription(e.target.value)} />
                    <button
                        onClick={() => {
                            setDescriptionAddMode(false)
                            setNewDescription("")
                            addDescriptionMutation({ menu_meal_id: data.meal_id, meal_description: newDescription, })
                        }}
                        className="flex items-center gap-1 p-2 bg-green-500 text-white rounded-lg shadow-sm">


                        <FaCheck />
                    </button>
                </div>
            }
            <div className="flex flex-col gap-2">
                {data.meals.map((meal, i) => <MealDescription key={i} meal={meal} />)}
            </div>
        </div>
    </div>
}