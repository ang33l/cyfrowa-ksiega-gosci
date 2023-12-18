import Link from "next/link";
import { BsHeartFill, BsPencil, BsUpload } from "react-icons/bs";
import localFont from "next/font/local";
import { GiMusicalNotes } from "react-icons/gi";

const rosaline = localFont({ src: "../fonts/RosalineSignature.ttf" });
const inkFree = localFont({ src: "../fonts/InkFreeImproved.woff" });

export default async function Home() {
  return (
    <div
      className={
        "flex flex-col gap-2 justify-center items-center h-screen px-2"
      }
    >
      <div className={`flex gap-3 text-7xl items-center ${rosaline.className}`}>
        Anna <BsHeartFill className={"text-4xl"} /> Alekasander
      </div>
      <h1 className={`${inkFree.className} text-4xl px-2`}>
        Zostaw coś po sobie!
      </h1>
      <div>
        <div className={`flex  ${inkFree.className} pt-2`}>
          <Link
            href="/wishes"
            className={`
          border-primary 
          text-center 
          flex flex-col gap-2
          items-center justify-center 
          p-5 
          text-3xl 
          bg-primary 
          hover:border-sky-400 hover:bg-orange-300 
          focus:border-sky-400 focus:bg-orange-300`}
          >
            Złóż życzenia <BsPencil />
          </Link>
          <Link
            href="/upload"
            className={`
          border-primary 
          text-center 
          flex flex-col gap-2
          items-center justify-center 
          p-5 
          text-3xl 
          bg-primary 
          hover:border-sky-400 hover:bg-orange-300 
          focus:border-sky-400 focus:bg-orange-300`}
          >
            Prześlij zdjęcia <BsUpload />
          </Link>
        </div>
        <div>
          <Link
            href="/songbook"
            className={`
            ${inkFree.className}
          border-primary 
          text-center 
          flex gap-2
          items-center justify-center 
          p-5 
          text-3xl 
          bg-primary 
          hover:border-sky-400 hover:bg-orange-300 
          focus:border-sky-400 focus:bg-orange-300`}
          >
            <GiMusicalNotes />
            Śpiewnik
          </Link>
        </div>
      </div>
    </div>
  );
}
