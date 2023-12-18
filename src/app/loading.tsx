import { BsHeartFill } from 'react-icons/bs'
import localFont from 'next/font/local';

const rosaline = localFont({ src: '../fonts/RosalineSignature.ttf' });

export default function Loading() {
    return <div className={`flex h-screen flex-col items-center justify-center ${rosaline.className}`} >
        <span className={'text-8xl'}>Anna</span>
        <span><BsHeartFill className={'text-4xl'} /></span>
        <span className={'text-8xl'}>Alekasander</span>
    </div>
}