"use client"

import { fetchPostList } from "@/features/posts/actions"
import { ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Skeleton } from "./ui/skeleton"

export default function LoadMorePostList({ query }: { query?: string }) {
    const [ref, inView] = useInView()
    const [data, setData] = useState<{ title: string, slug: string }[]>([])
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState<boolean>(false)
    const PAGE_PER_ITEM = 6;

    useEffect(() => {
        if (!inView || loading) return
        setLoading(true)
        fetchPostList({ page, query }).then((res) => {
            setData([...data, ...res])
            setLoading(false)
            setPage(prev => prev + 1)
            if (res.length < PAGE_PER_ITEM) {
                setHasMore(false)
            }
        })

    }, [inView, page, loading, hasMore])



    return (
        <>
            {data.map(({ slug, title }) => (
                <Link
                    key={slug}
                    href={`/posts/${slug}`}
                    className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4 transition-all hover:border-blue-400 hover:bg-blue-50"
                >
                    {/* Left */}
                    <div className="flex items-center gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                            <ArrowRight className="h-4 w-4" />
                        </div>

                        <p className="line-clamp-1 text-sm font-medium text-gray-800 group-hover:text-blue-700">
                            {title}
                        </p>
                    </div>
                </Link>
            ))}

            {hasMore && <div ref={ref} className="h-10" />}
            {loading && (
                <div className="flex flex-col gap-4">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
            )}
        </>
    )
}
