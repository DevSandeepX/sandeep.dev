"use client"

import { fetchAnime } from '@/app/action'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useInView } from "react-intersection-observer"

export function LoadMore() {
    const { ref, inView } = useInView()
    const [data, setData] = useState<any[]>([])
    const [page, setPage] = useState(2)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!inView || loading) return
        setLoading(true)
        fetchAnime(page).then((res) => {
            setData([...data, ...res])
            setPage(prev => prev + 1)
            setLoading(false)
        })

    }, [inView, page, loading])

    return (
        <>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {data.map((d, i) => (
                    <div className='relative h-[200px] w-full' key={i}>
                        <Image
                            src={`https://shikimori.one${d.image.original}`}
                            alt={d.name}
                            fill
                            className="aspect-video rounded"
                        />
                    </div>
                ))}
            </section>
            <section ref={ref}>
                <Loader2 className='animate-spin' />
            </section>

        </>
    )
}
