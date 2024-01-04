import { Id } from "../../../convex/_generated/dataModel";

interface ScheduleEventProps {
    time: string
    description: {
        _id: Id<"meal_description">;
        _creationTime: number;
        meal_description: string;
        menu_meal_id: Id<"menu_meal">;
    }[];
    index: number
}
export default function MenuOption(props: ScheduleEventProps) {
    const { time, description, index } = props;
    return (<div className=" flex items-stretch">
        <div className={`${index % 2 == 0 && "bg-[#f7ba604b]"} p-2 flex-1 border-r-[1px] border-[#f7bb60]`}>{time}</div>
        <div className={`${index % 2 == 0 && "bg-[#f7ba604b]"} p-2 flex-[4]`}>
            <ul className="list-disc list-inside">
                {description.map((e, i) => {
                    return <li>{e.meal_description}</li>
                })}
            </ul>
        </div>
    </div>)
}