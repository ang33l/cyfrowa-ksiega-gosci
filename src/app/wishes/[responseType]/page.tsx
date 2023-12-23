"use client";
import { notFound, useRouter } from "next/navigation";
import { BsCheck2Square, BsExclamationSquare } from "react-icons/bs";
import { animated } from "@react-spring/web";
import { useState, useEffect } from "react";


export default function Page({ params }: { params: { responseType: string } }) {
    const { responseType } = params;
    const [progressValue, setProgressValue] = useState(0);
    const router = useRouter()

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressValue((prevValue) => {
                if (prevValue < 100) {
                    return prevValue + 0.5;
                } else {
                    router.replace("/")
                    clearInterval(interval);
                    return prevValue;
                }
            });
        }, 25);
        return () => clearInterval(interval);
    }, []);
    if (responseType !== "success" && responseType !== "error") {
        return notFound();
    }
    return (
        <div className={"flex flex-col gap-4 w-full my-28"}>
            <div
                className={`bg-primary border w-full flex flex-col m-auto gap-2 items-center py-8 px-3`}
            >
                {responseType === "success" ? (
                    <>
                        <BsCheck2Square className={"text-8xl text-green-700"} />
                        <div className={"text-4xl text-center"}>
                            Pomyślnie przesłano życzenia!
                        </div>
                    </>
                ) : (
                    <>
                        <BsExclamationSquare className={"text-8xl text-red-500"} />
                        <div className={"text-4xl text-center"}>
                            Wystąpił błąd podczas przesyłania życzeń!
                        </div>
                    </>
                )}

                <animated.progress
                    value={progressValue}
                    max={100}
                    className={"w-full h-1 bg-slate-400"}
                />
            </div>
        </div>
    );
}
