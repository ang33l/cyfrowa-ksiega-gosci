"use client"
import { useState, } from "react"
import { useQuery } from "convex/react";
import Image from "next/image"
import { api } from "../../../../convex/_generated/api";
import { Fade } from 'react-slideshow-image';
import { PhotoProvider, PhotoView } from 'react-photo-view';

export default function Wish({ _id, wish_author, wish_content, _creationTime }: { _id: string, wish_author: string, wish_content: string, _creationTime: number }) {
    const [isWholeTextVisible, setIsWholeTextVisible] = useState(false)

    const changeVisibility = () => {
        setIsWholeTextVisible((e) => !e)
    }

    const imagesLinks = useQuery(api.files.getImagesOfWish, { wish_id: _id })

    const time = new Date(_creationTime);
    return (
        <div className="bg-[#f7ba604b] px-2 py-4 transition-all">
            <p className="font-bold text-2xl">{wish_author}</p>
            <span className="text-gray-700">{time.getHours()}:{time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()} {time.toLocaleDateString()}</span>
            <p
                onClick={changeVisibility}
                className={`cursor-pointer text-xl ${isWholeTextVisible ? 'expanded-text' : 'text--ellipsis'}`}
            >
                {wish_content}
            </p>
            {imagesLinks && imagesLinks?.length === 1 ? imagesLinks[0].wish_media_file.includes('.mp4') ? <video

                className="w-full max-h-[350px]"
                src={`/api/get/image/${imagesLinks[0].wish_media_file}`} controls playsInline>
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

        </div >
    )
}