import MenuOption from "@/components/mealsMenu/menuOption";

export default function Page() {
    return (<>
        <h1 className="text-3xl">Menu posiłków</h1>
        <p>14.08.2023r.</p>
        <div className="flex flex-col">
            {[0, 1, 2].map((e, i) => {
                return <MenuOption index={i} time={"Kolacja"} description={["Rosół z makaronem.", "Devolay z puree ziemniaczanym i buraczkami"]} />
            })}

        </div>
    </>)
}