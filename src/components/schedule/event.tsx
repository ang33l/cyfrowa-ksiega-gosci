interface ScheduleEventProps {
    time: string
    description: string
    index: number
}
export default function ScheduleEvent(props: ScheduleEventProps) {
    const { time, description, index } = props;
    return (<div className=" flex items-stretch">
        <div className={`${index % 2 == 0 && "bg-[#f7ba604b]"} p-2 flex-1 border-r-[1px] border-[#f7bb60]`}>{time}</div>
        <div className={`${index % 2 == 0 && "bg-[#f7ba604b]"} p-2 flex-[4]`}>{description}</div>
    </div>)
}