import { CommentForm } from "@/components/CommentForm"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { comments, posts } from "@/database/schema"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { and, desc, eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import React, { ReactNode } from "react"

export default async function SlugLayout({
    params,
    children,
}: {
    children: ReactNode
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const user = await getCurrentUser()
    const post = await db.query.posts.findFirst({
        where: and(eq(posts.slug, slug), eq(posts.status, "published")),
        columns: { id: true }
    })
    if (!post) return notFound()

    const postComments = await db.query.comments.findMany({
        where: eq(comments.postId, post?.id),
        columns: { id: true, comment: true },
        limit: 10
    })


    return (
        <MaxWidthWrapper>
            {/* full height area */}
            <main className="flex flex-col md:flex-row h-[calc(100vh-80px)] gap-4 w-full">

                {/* LEFT: CONTENT SCROLL */}
                <section className="md:w-6/10 w-full overflow-y-auto pr-2">
                    {children}
                </section>

                {/* RIGHT: COMMENTS SCROLL */}
                <aside className="md:w-4/10 w-full overflow-y-auto border-l pl-4">
                    <h2 className="font-semibold text-lg mb-3">Comments</h2>

                    <div className="flex flex-col gap-3 relative">
                        {
                            user && (

                                <CommentForm postId={post.id} userId={user.id} />

                            )
                        }
                        {postComments.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-lg bg-muted p-3 text-sm line-clamp-1"
                            >
                                {item.comment}
                            </div>
                        ))}


                    </div>
                </aside>

            </main>
        </MaxWidthWrapper>
    )
}
