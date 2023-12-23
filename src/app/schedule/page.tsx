import ScheduleEvent from "@/components/schedule/event";

export default function Page() {
    return (<>
        <h1 className="text-3xl">Harmonogram wesela</h1>
        <p>14.08.2023r.</p>
        <div className="flex flex-col">
            {[0, 1, 2].map((e, i) => {
                return <ScheduleEvent index={i} time={"15:00"} description={"Opis wydarzenia, który jest dłuższy bla bla coś tam tak lorem ipsum."} />
            })}

        </div>
    </>)
}