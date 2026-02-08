"use client"

import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function SearchForm() {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const searchParamsString = searchParams.toString()
    const [query, setQuery] = useState(searchParams.get("query") ?? "")

    useEffect(() => {
        const params = new URLSearchParams(searchParamsString)

        const timeout = setTimeout(() => {
            if (!query.trim()) {
                params.delete("query")
            } else {
                params.set("query", query)
            }

            router.replace(`${pathname}?${params.toString()}`)
        }, 300)

        return () => clearTimeout(timeout)
    }, [query, pathname, router, searchParamsString])

    return (
        <div className="relative flex w-full max-w-2xl items-center">
            <Search
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={16}
            />
            <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="pl-8 border border-zinc-800/30 focus:ring-0"
            />
        </div>
    )
}
