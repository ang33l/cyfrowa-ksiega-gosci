import DialogTemplate from "@/components/dialog";
import { Id } from "../../../../convex/_generated/dataModel";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";

export default function SingleEvent({ data }: {
    data: {
        _id: Id<"schedule">;
        _creationTime: number;
        time: string;
        description: string;
    }
}) {
    const [hourEditMode, setHourEditMode] = useState(false)
    const [hour, setHour] = useState(data.time)
    const [descriptionEditMode, setDescriptionEditMode] = useState(false)
    const [description, setDescription] = useState(data.description)
    const deleteMutation = useMutation(api.schedule.deleteEvent)
    const updateEvent = useMutation(api.schedule.updateEvent)
    const onDelete = () => {
        deleteMutation({ event_id: data._id })
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
                            defaultValue={data.time}
                            onChange={(e) => setHour(e.target.value)} />
                        <button
                            onClick={() => {
                                setHourEditMode(false)
                                updateEvent({ event_id: data._id, time: hour, })
                            }}
                            className="flex items-center gap-1 p-2 bg-green-500 text-white rounded-lg shadow-sm">


                            <FaCheck />
                        </button>
                    </div>

                    :
                    <span className="text-xl  font-bold">
                        {data.time}
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


            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <span>Godzina</span>
                    <button
                        onClick={() => setDescriptionEditMode(!descriptionEditMode)}
                        className={`flex items-center gap-1 p-1 ${descriptionEditMode ? "bg-red-500 text-white" : "bg-orange-300"} rounded-lg shadow-sm`}>
                        {descriptionEditMode ? <>Anuluj<RxCross2 />
                        </> : <>Edytuj<FiEdit /></>}
                    </button>
                </div>
                {descriptionEditMode ?
                    <div className="flex gap-1 mt-2 ">
                        <input
                            type="text"
                            className="px-2 py-2 rounded-lg flex-1"
                            defaultValue={data.description}
                            onChange={(e) => setDescription(e.target.value)} />
                        <button
                            onClick={() => {
                                setDescriptionEditMode(false)
                                updateEvent({ event_id: data._id, description: description })
                            }}
                            className="flex items-center gap-1 p-2 bg-green-500 text-white rounded-lg shadow-sm">


                            <FaCheck />
                        </button>
                    </div>

                    :
                    <span className="text-xl  font-bold">
                        {data.description}
                    </span>
                }
            </div>
        </div>
    </div>
}