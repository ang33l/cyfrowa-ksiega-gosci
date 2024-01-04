"use client"
import { useQuery, } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import Spinner from "@/components/spinner"
import Link from "next/link"
import { MdArrowBackIos } from "react-icons/md"
import SingleWish from "@/components/admin/wishes/singleWish"

export default function Page({ params: { wishId } }: { params: { wishId: string } }) {
    const wish = useQuery(api.wishes.single, { wish_id: wishId })
    if (!wish) return <Spinner text="Wczytywanie życzenia..." />
    return (
        <div className="mt-6">
            <Link
                href="/admin/wishes"
                className={
                    "flex items-center text-xl p-2 bg-orange-300 w-max rounded-md shadow-md mb-10"
                }
            >
                <MdArrowBackIos /> Powrót do listy życzeń
            </Link>
            <SingleWish
                _id={wish[0]._id}
                wish_author={wish[0].wish_author}
                wish_content={wish[0].wish_content}
                _creationTime={wish[0]._creationTime} />

        </div>
    )
}