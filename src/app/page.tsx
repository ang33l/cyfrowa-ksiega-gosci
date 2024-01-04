"use client";
import { api } from "../../convex/_generated/api";
import Header from "@/components/header";
import Wish from "@/components/home/wish";
import { usePaginatedQuery } from "convex/react";
import { useEffect } from 'react';
import { useIntersection, useWindowScroll } from '@mantine/hooks';
import Spinner from "@/components/spinner";
export default function Home() {
  const [scroll, scrollTo] = useWindowScroll();

  const { ref, entry } = useIntersection();

  const { results, status, loadMore } = usePaginatedQuery(
    api.wishes.getWishes,
    {},
    { initialNumItems: 10 }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      loadMore(10);
    }
  }, [scroll.y])
  return (
    <>
      <Header />
      <div
        className={
          `flex flex-col gap-2 justify-center p-2 `
        }
      >

        <h1 className="text-3xl">Ostatnio dodane</h1>
        <div className="flex flex-col gap-2">
          {results?.map(({ _id, wish_author, wish_content, _creationTime }, i) => (
            <Wish key={i} _id={_id} wish_author={wish_author} wish_content={wish_content} _creationTime={_creationTime} />
          ))}
          <div> {status === "LoadingMore" ? <div className="text-2xl text-center py-4"><Spinner /></div> : status === "CanLoadMore" ? <div ref={ref}></div> : status === "Exhausted" && <div className="text-2xl text-center py-4">To wszystkie dostępne wpisy!</div>}</div>

        </div>

      </div></>
  );
}
