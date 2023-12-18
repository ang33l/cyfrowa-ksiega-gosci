"use client"
import localFont from "next/font/local";
import Link from "next/link";
import { BsPencil, BsUpload } from "react-icons/bs";
import { GiMusicalNotes } from "react-icons/gi";
const inkFree = localFont({ src: "../fonts/InkFreeImproved.woff" });
import { useState, } from 'react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";


function MenuButton(props: { toggleMenu: Dispatch<SetStateAction<boolean>> }) {
    const { toggleMenu } = props
    return (
        <button onClick={() => toggleMenu((e) => !e)} className=" text-5xl cursor-pointer border border-black p-1 rounded-lg focus:outline-none flex justify-center"><RxHamburgerMenu />
        </button>
    )
}

function Menu(props: { menuOpened: boolean, toggleMenu: Dispatch<SetStateAction<boolean>> }) {
    const { menuOpened, toggleMenu } = props
    const router = useRouter();

    console.log(router)

    const menuItems = [
        { label: 'Strona główna', path: '/' },
        { label: 'Śpiewnik', path: '/songbook' },
        { label: 'Contact', path: '/contact' },
    ];

    return (<>

        <div style={{ width: "calc(100vw - (100vw - 100%))" }} className={`${inkFree.className} menu-bg fixed w-[calc(100vw - (100vw - 100%))] h-[100dvh] top-0 z-100  ${menuOpened ? 'left-[-100dvw]' : 'left-0'} transition-all duration-300 p-4 flex flex-col`}>
            <button onClick={() => toggleMenu((e) => !e)} className="self-end text-5xl cursor-pointer border border-black p-1 rounded-lg focus:outline-none flex justify-center"><MdClose />
            </button>
            <ul className="list-none p-0">
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={`mb-2 ${router.pathname === item.path ? 'text-yellow-500' : ''
                            }`}
                    >
                        <Link href={item.path}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </div></>
    );
};

export { MenuButton, Menu }
/*export default function Menu({ menuItem }: { menuItem: number }) {
    return (
        <nav
            className={`fixed flex ${inkFree.className} w-full border-primary bottom-0 justify-between bg-primary`}
        >
            <Link
                href="/wishes"
                className={`
          w-full
          text-center 
          flex gap-2
          items-center justify-center 
          p-5 
          sm:text-lg
          md:text-xl 
          ${menuItem == 1 && " font-semibold bg-orange-300 "}
          hover:border-sky-400 hover:bg-orange-300 
          focus:border-sky-400 focus:bg-orange-300`}
            >
                <BsPencil /> Złóż życzenia
            </Link>
            <Link
                href="/upload"
                className={`
          w-full
          text-center 
          flex gap-2
          items-center justify-center 
          p-5 
          sm:text-lg
          md:text-xl 
          ${menuItem == 2 && " font-semibold bg-orange-300 "}
          hover:border-sky-400 hover:bg-orange-300 
          focus:border-sky-400 focus:bg-orange-300`}
            >
                <BsUpload />
                Prześlij zdjęcia
            </Link>
            <Link
                href="/songbook"
                className={`
          w-full
          text-center 
          flex gap-2
          items-center justify-center 
          p-5 
          sm:text-lg
          md:text-xl 
          ${menuItem == 3 && " font-semibold bg-orange-300 "}
          hover:border-sky-400 hover:bg-orange-300 
          focus:border-sky-400 focus:bg-orange-300`}
            >
                <GiMusicalNotes />
                Śpiewnik
            </Link>
        </nav>
    );
}
*/