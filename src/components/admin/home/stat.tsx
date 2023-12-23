import Spinner from "@/components/spinner";
import { Any } from "@react-spring/web";

export default function Stat({ name, counter, loading = false }: { name: string, counter?: number, loading?: boolean }) {
    return (
        <div className="rounded-xl bg-[#f7ba604b] p-4">

            <div>
                <p className="text-xl ">
                    {name}
                </p>

                <span className="text-3xl font-bold">
                    {loading ?
                        <Spinner /> :
                        counter && counter}


                </span>
            </div>

        </div>
    )
}