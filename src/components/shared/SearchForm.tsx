"use client"
import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function SearchForm() {

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())
    const [query, setQuery] = useState(params.get("query") ?? "")

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams.toString())

        const timeout = setTimeout(() => {
            if (!query || typeof query !== "string") {
                newParams.delete("query")
            } else {
                newParams.set("query", query)
            }

            router.push(`${pathname}?${newParams}`)
        }, 300)

        return () => clearTimeout(timeout)
    }, [query, router, pathname, searchParams])



    return (
        <div className='flex items-center w-full shrink relative max-w-2xl'>
            <Search className='absolute top-1/2 -translate-y-1/2 left-2' size={16} />
            <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search...'
                className='pl-6 border border-zinc-800/30 focus:ring-0 focus:outline-0 focus:shadow-none' />
        </div>
    )
}
