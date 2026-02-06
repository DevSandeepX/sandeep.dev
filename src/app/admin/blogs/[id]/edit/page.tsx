import { posts } from "@/database/schema"
import { PostForm } from "@/features/posts/components/PostForm"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export default async function Page({ params }: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params
    const blog = await db.query.posts.findFirst({
        where: eq(posts.id, id)
    })

    if (!blog) return notFound()

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Edit Post</h2>
            <Suspense fallback={<h2>Loading...</h2>}>

                <PostForm post={blog} />
            </Suspense>
        </div>
    )
}
