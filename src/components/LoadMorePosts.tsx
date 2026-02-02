"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import fetchPosts from "@/database/actions"
import PostCard, { Post } from "./PostCard"
import PostCardSkeleton from "./PostCardSkelton"

export function LoadMorePosts() {
    const LIMIT = 6

    const [data, setData] = useState<Post[]>([])
    const [page, setPage] = useState(2)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const { ref, inView } = useInView({
        rootMargin: "200px",
    })

    useEffect(() => {
        if (!inView || isLoading || !hasMore) return

        setIsLoading(true)

        fetchPosts(page, LIMIT)
            .then((res) => {
                if (res.length < LIMIT) {
                    setHasMore(false)
                }

                setData((prev) => [...prev, ...res])
                setPage((prev) => prev + 1)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [inView, page, isLoading, hasMore])

    return (
        <>
            <section className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((post) => (
                        <PostCard key={post.id} {...post} />
                    ))}
                </div>
            </section>

            {/* 👇 SENTINEL (THIS IS IMPORTANT) */}
            {hasMore && <div ref={ref} className="h-10" />}

            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                </div>
            )}
        </>
    )
}
