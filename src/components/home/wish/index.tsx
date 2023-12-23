"use client"
import { useState, useEffect } from "react"
import { useQuery } from "convex/react";
import Image from "next/image"
import { SlideshowLightbox, initLightboxJS } from 'lightbox.js-react'
import { api } from "../../../../convex/_generated/api";
import { Fade, Slide } from 'react-slideshow-image';
import { PhotoProvider, PhotoView } from 'react-photo-view';

export default function Wish({ _id, wish_author, wish_content, _creationTime }: { _id: string, wish_author: string, wish_content: string, _creationTime: number }) {
    const [isWholeTextVisible, setIsWholeTextVisible] = useState(false)

    const changeVisibility = () => {
        setIsWholeTextVisible((e) => !e)
    }

    const imagesLinks = useQuery(api.files.getImagesOfWish, { wish_id: _id })

    //jesli na dniach otrzymam to zrobie z tym
    /*useEffect(() => {
        initLightboxJS("Insert License key", "Insert plan type here");
    });*/
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
            {imagesLinks && imagesLinks?.length === 1 ?
                <PhotoProvider>
                    <PhotoView src={`/api/get/image/${imagesLinks[0].wish_media_file}`}>
                        <Image src={`/api/get/image/${imagesLinks[0].wish_media_file}`} width={1000} height={1000} alt="" />
                    </PhotoView>
                </PhotoProvider>
                :
                imagesLinks?.length !== 0 && <PhotoProvider>
                    <Fade autoplay={false}>
                        {imagesLinks?.map(({ wish_media_file }, i) => {
                            return (

                                <div key={i} className="each-slide-effect">
                                    <PhotoView src={`/api/get/image/${wish_media_file}`}>
                                        <Image src={`/api/get/image/${wish_media_file}`} width={1000} height={1000} alt="" />
                                    </PhotoView>
                                </div>
                            )
                        })}
                    </Fade>
                </PhotoProvider>
            }

        </div >
    )
}