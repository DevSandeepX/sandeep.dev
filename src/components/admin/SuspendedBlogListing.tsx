import { posts } from '@/database/schema'
import { db } from '@/lib/db'
import { and, eq, ilike } from "drizzle-orm"
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SearchForm from '../shared/SearchForm'
import LoadMorePostList from '../LoadMorePostList'

// type Props = {
//     query: string
// }

export default async function SuspendedBlogListing({ query }: {
    query: string | undefined
}) {

    const blogs = await getAllBlogs(query ?? "")

    return (

        <main className="w-full max-w-3xl space-y-4">
            <SearchForm />
            {blogs.map(({ slug, title }) => (
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
            <LoadMorePostList query={query} />
        </main>

    )
}




async function getAllBlogs(query: string) {
    const conditions = [eq(posts.status, "published")]

    if (query.trim()) {
        conditions.push(ilike(posts.title, `%${query}%`))
    }

    return db.query.posts.findMany({
        columns: {
            title: true,
            slug: true,
        },
        where: and(...conditions),
        limit: 6,
        orderBy: (posts, { desc }) => desc(posts.createdAt),
    })
}


export function BlogListingSkeleton() {
    return (
        <div className="space-y-3">
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
        </div>
    )
}