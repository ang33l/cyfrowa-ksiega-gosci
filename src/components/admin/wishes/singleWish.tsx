"use client"
import { FaTrashAlt } from "react-icons/fa";

import DialogTemplate from "@/components/dialog";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Image from "next/image";
import { Fade } from "react-slideshow-image";
import { useRouter } from "next/navigation";
export default function SingleWish({ _id, wish_author, wish_content, _creationTime }: { _id: string, wish_author: string, wish_content: string, _creationTime: number }) {
    const time = new Date(_creationTime);
    const imagesLinks = useQuery(api.files.getImagesOfWish, { wish_id: _id })
    const deleteMutation = useMutation({
        mutationFn: async () => {
            await axios.delete(`/api/delete/wish/`, { data: { wish_id: _id } })
        }
    })
    const router = useRouter()
    const onDelete = () => {
        deleteMutation.mutate()
        router.push("/admin/wishes")

    }

    return (<><div className="bg-[#f7ba604b] px-2 py-4 flex flex-col rounded-lg gap-2">
        <div className="flex gap-2">
            <div className="flex flex-1 flex-col rounded-xl p-3  bg-[#f7ba604b]">
                <span>Autor</span>
                <span className="text-xl  font-bold">{wish_author}</span>
            </div>
            <div className=" flex-1 flex flex-col rounded-xl p-3 bg-[#f7ba604b]">
                <span>Dodane</span>
                <span className="text-xl  font-bold">{time.getHours()}:{time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()} {time.toLocaleDateString()}</span>
            </div>
            <DialogTemplate
                onAcceptClick={onDelete}
                dialog_title="Usuń wpis"
                dialog_description="Na pewno chcesz usunąć wpis?"
                button_accept_text="Usuń"
                buttonClassName="bg-[#f7ba604b] p-3 items-center justify-center rounded-xl border-none flex flex-col text-xl text-red-500"
                button_content={<><FaTrashAlt className={"text-red-500"} /> Usuń</>}
            />

        </div>


        {imagesLinks && imagesLinks?.length === 1 ? imagesLinks[0].wish_media_file.includes('.mp4') ? <video

            className="w-full max-h-[350px]"
            src={`/api/get/image/${imagesLinks[0].wish_media_file}`} controls>
        </video> :
            <PhotoProvider>
                <PhotoView src={`/api/get/image/${imagesLinks[0].wish_media_file}`}>

                    <Image
                        src={`/api/get/image/${imagesLinks[0].wish_media_file}`}
                        width={1000}
                        height={1000}
                        alt="" loading="lazy" />

                </PhotoView>
            </PhotoProvider>
            :
            imagesLinks?.length !== 0 && <PhotoProvider>
                <Fade autoplay={false}>
                    {imagesLinks?.map(({ wish_media_file }, i) => {
                        const isMp4 = wish_media_file.includes('.mp4');

                        return (

                            <div key={i} className="each-slide-effect">
                                {isMp4 ? <video
                                    className="w-full max-h-[350px]"
                                    src={`/api/get/image/${wish_media_file}`} controls></video>
                                    :
                                    <PhotoView src={`/api/get/image/${wish_media_file}`}>
                                        <Image loading="lazy" src={`/api/get/image/${wish_media_file}`} width={1000} height={1000} alt="" />
                                    </PhotoView>}
                            </div>
                        )
                    })}
                </Fade>
            </PhotoProvider>
        }
        <div className="flex flex-1 flex-col rounded-xl p-3  bg-[#f7ba604b]">
            <span>Treść życzeń</span>
            <p className="text-xl  font-bold">{wish_content}</p>
        </div>
    </div>

    </>
    )
}