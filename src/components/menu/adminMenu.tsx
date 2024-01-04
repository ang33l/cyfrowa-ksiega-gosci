"use client"
import Link from "next/link";
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
        { label: 'Strona główna', path: '/admin/home' },
        { label: 'Zarządzenie życzeniami', path: '/admin/wishes' },
        { label: 'Zarządzanie śpiewnikiem', path: '/admin/songbook' },
        { label: 'Propozycje piosenek', path: '/admin/suggests' },
        { label: 'Zarządzanie quizem', path: '/admin/quiz' },
        { label: 'Zarządzanie harmonogramem', path: '/admin/schedule' },
        { label: 'Zarządzanie posiłkami', path: '/admin/meals' },
        { label: 'Ustawienia aplikacji', path: '/admin/settings' },
    ];

    return (<>

        <div style={{ width: "calc(100vw - (100vw - 100%))" }} className={`text-2xl  menu-bg fixed w-[calc(100vw - (100vw - 100%))] h-[100dvh] top-0 z-[100]  ${menuOpened ? 'left-[-100dvw]' : 'left-0'} transition-all duration-300 p-4 flex flex-col overflow-y-auto`}>
            <button onClick={() => toggleMenu((e) => !e)} className="self-end text-3xl cursor-pointer border border-black p-1 rounded-lg focus:outline-none flex justify-center"><MdClose />
            </button>
            <ul className="list-none pt-2 ">
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={`rounded-xl  ${pathname.includes(item.path) ? 'bg-[#f7ba604b] font-bold' : ''
                            }`}
                    >
                        <Link className="px-2 py-3 block" onClick={() => toggleMenu((e) => !e)} href={item.path}>{item.label}</Link>
                    </li>
                ))}
            </ul>
            <div className="border-b my-6"> </div>
            <h2 className="text-center text-xl mb-2">Powrót do strony głównej</h2>
            <div className="flex gap-2">
                <Link className="flex-1 text-center py-2 rounded-xl bg-[#f7ba604b]"
                    href="/">
                    Wyloguj się
                </Link>
            </div>

        </div>
    </>
    );
};

export { MenuButton, Menu }
