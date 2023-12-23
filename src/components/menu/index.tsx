"use client"
import localFont from "next/font/local";
import Link from "next/link";
import { BsPencil, BsUpload } from "react-icons/bs";
import { GiMusicalNotes } from "react-icons/gi";
import { useState, } from 'react';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";


function MenuButton(props: { toggleMenu: Dispatch<SetStateAction<boolean>> }) {
    const { toggleMenu } = props
    return (
        <button onClick={() => toggleMenu((e) => !e)} className=" text-3xl cursor-pointer border border-black p-1 rounded-lg focus:outline-none flex justify-center"><RxHamburgerMenu />
        </button>
    )
}

function Menu(props: { menuOpened: boolean, toggleMenu: Dispatch<SetStateAction<boolean>> }) {
    const { menuOpened, toggleMenu } = props
    const pathname = usePathname();


    const menuItems = [
        { label: 'Strona główna', path: '/' },
        { label: 'Złóż życzenia', path: '/wishes' },
        { label: 'Prześlij multimedia', path: '/upload' },
        { label: 'Quiz o parze młodej!', path: '/quiz' },
        { label: 'Zaproponuj piosenkę!', path: '/suggest' },
        { label: 'Śpiewnik', path: '/songbook' },
        { label: 'Harmonogram wesela', path: '/schedule' },
        { label: 'Menu posiłków', path: '/menu' },
    ];

    return (<>

        <div style={{ width: "calc(100vw - (100vw - 100%))" }} className={`text-2xl  menu-bg fixed w-[calc(100vw - (100vw - 100%))] h-[100dvh] top-0 z-[100]  ${menuOpened ? 'left-[-100dvw]' : 'left-0'} transition-all duration-300 p-4 flex flex-col overflow-y-auto`}>
            <button onClick={() => toggleMenu((e) => !e)} className="self-end text-3xl cursor-pointer border border-black p-1 rounded-lg focus:outline-none flex justify-center"><MdClose />
            </button>
            <ul className="list-none pt-2 ">
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={`rounded-xl  ${pathname === item.path ? 'bg-[#f7ba604b] font-bold' : ''
                            }`}
                    >
                        <Link className="px-2 py-3 block" href={item.path}>{item.label}</Link>
                    </li>
                ))}
            </ul>
            <div className="border-b my-6"> </div>
            <h2 className="text-center text-xl mb-2">Logowanie</h2>
            <div className="flex gap-2">
                <Link className="flex-1 text-center py-2 rounded-xl bg-[#f7ba604b]"
                    href="/admin/home">
                    Administrator
                </Link>
                <Link href="/employee/home" className="flex-1 text-center py-2 rounded-lg bg-[#f7ba604b]">
                    Pracownik
                </Link>
            </div>

        </div>
    </>
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