"use client"
import localFont from "next/font/local";
import { BsHeartFill } from "react-icons/bs";
import { Menu, MenuButton } from "../menu/adminMenu";
import { useState } from 'react';
import Link from "next/link";
const rosaline = localFont({ src: '../../fonts/RosalineSignature.ttf' });
export default function AdminHeader() {
    const [isMenuOpen, setMenuOpen] = useState(true);
    return (
        <>
            <header className={`z-[100] fixed top-0 flex gap-3 text-4xl items-center bg-primary w-full shadow-md px-2 py-3 justify-between relative`}>
                <Link href={"/admin/home"} className={`${rosaline.className} flex items-center gap-3`}>Anna <BsHeartFill className={"text-xl"} /> Alekasander</Link>
                <MenuButton toggleMenu={setMenuOpen}></MenuButton>
                <Menu menuOpened={isMenuOpen} toggleMenu={setMenuOpen} />
            </header>

        </>
    )
}