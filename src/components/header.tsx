"use client"
import localFont from "next/font/local";
import { BsHeartFill } from "react-icons/bs";
import { Menu, MenuButton } from "./menu";
import { useState } from 'react';
import Link from "next/link";
const rosaline = localFont({ src: '../fonts/RosalineSignature.ttf' });
export default function Header() {
    const [isMenuOpen, setMenuOpen] = useState(true);
    return (
        <>
            <header className={`z-10 fixed top-0 flex gap-3 text-6xl items-center ${rosaline.className} bg-primary w-full shadow-md px-2 py-3 justify-between relative`}>
                <Link href={"/"} className="flex items-center gap-3">Anna <BsHeartFill className={"text-3xl"} /> Alekasander</Link>
                <MenuButton toggleMenu={setMenuOpen}></MenuButton>
                <Menu menuOpened={isMenuOpen} toggleMenu={setMenuOpen} />
            </header>

        </>
    )
}