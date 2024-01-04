import { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { FiEdit } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import DialogTemplate from "@/components/dialog";

export default function MealDescription({ meal }: {
    meal: {
        _id: Id<"meal_description">;
        _creationTime: number;
        meal_description: string;
        menu_meal_id: Id<"menu_meal">;
    }
}) {
    const [mealDescription, setMealDescription] = useState(meal.meal_description)
    const [mealEditMode, setMealEditMode] = useState(false)
    const updateMealDescription = useMutation(api.meal.updateMealDescrioption)
    const deleteMutation = useMutation(api.meal.deleteMealDescription)
    const onDelete = () => {
        deleteMutation({ meal_id: meal._id })
    }
    return (
        <div className="flex gap-1">
            {mealEditMode ?
                <div className="flex gap-1 ">
                    <input
                        type="text"
                        className="px-2 py-2 rounded-lg flex-1"
                        defaultValue={meal.meal_description}
                        onChange={(e) => setMealDescription(e.target.value)} />
                    <button
                        onClick={() => {
                            setMealEditMode(false)
                            updateMealDescription({ meal_id: meal._id, meal_description: mealDescription })
                        }}
                        className="flex items-center gap-1 p-2 bg-green-500 text-white rounded-lg shadow-sm">


                        <FaCheck />
                    </button>
                </div>

                :
                <span className="text-xl  font-bold text-balance">
                    {meal.meal_description}
                </span>
            }
            <button
                onClick={() => {
                    setMealEditMode(!mealEditMode)
                }}
                className={`flex items-center gap-1 self-center text-base font-normal p-1 ${mealEditMode ? "bg-red-500 text-white" : "bg-orange-300"} rounded-lg shadow-sm`}>
                {mealEditMode ? <>Anuluj<RxCross2 />
                </> : <>Edytuj<FiEdit /></>}
            </button>
            <DialogTemplate
                onAcceptClick={onDelete}
                dialog_title="Usuń posiłek"
                dialog_description="Na pewno chcesz usunąć ten posiłek menu?"
                button_accept_text="Usuń"
                buttonClassName={`flex items-center self-center gap-1 text-base font-normal p-1 bg-red-500 text-white rounded-lg shadow-sm`}
                button_content={<><FaTrashAlt className={"text-white"} /> Usuń</>}
            />
        </div>
    )
}