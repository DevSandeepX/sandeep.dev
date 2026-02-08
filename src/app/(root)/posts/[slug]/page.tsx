export const dynamic = "force-dynamic"

import { posts, users } from "@/database/schema"
import { db } from "@/lib/db"
import { and, eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import Image from "next/image"
import MarkdownRenderer from "@/components/MarkdownRenderer"
import RatingForm from "@/features/rating/components/RatingForm"
import { auth } from "@clerk/nextjs/server"
import { getAverageRating } from "@/features/rating/lib/getAvgRating"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import SuspendedBlogListing, { BlogListingSkeleton } from "@/components/admin/SuspendedBlogListing"
import { Suspense } from "react"
import SuspendedCommentsList from "@/components/SuspendedCommentsList"
import { CommentForm } from "@/components/CommentForm"

const Page = async ({ params, searchParams }: {

    params: Promise<{ slug: string }>
    searchParams: Promise<{ query?: string }>
}) => {
    const { slug } = await params
    const { query } = await searchParams ?? ""


    const post = await db.query.posts.findFirst({
        columns: { id: true, title: true, image: true },
        with: { markdown: { columns: { content: true } } },
        where: and(eq(posts.slug, slug), eq(posts.status, "published")),
    })

    if (!post) return notFound()
    const { userId } = await auth()

    const [user, ratingResult] = await Promise.all([
        userId
            ? db.query.users.findFirst({
                columns: { id: true },
                where: eq(users.id, userId),
            })
            : Promise.resolve(null),

        getAverageRating(post.id),
    ])

    const avgRating = ratingResult.avgRating


    return (
        <>
            {/* IMAGE */}
            <MaxWidthWrapper>

                <div className="flex flex-col gap-6 lg:flex-row lg:h-[calc(100vh-80px)]">

                    <div className="w-full lg:w-3/5 lg:overflow-y-auto lg:pr-4">

                        <div className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] mb-6">

                            {post.image && (
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="rounded object-cover"
                                />
                            )}
                        </div>
                        <section className="flex items-center justify-between w-full">
                            {userId && (<RatingForm postId={post.id} userId={userId} />)}
                            <div>Average ⭐({avgRating})</div>
                        </section>
                        {/* CONTENT */}
                        <article className="prose dark:prose-invert max-w-none">
                            {post.markdown && (
                                <MarkdownRenderer content={post.markdown.content} />
                            )}
                        </article>

                        <div className="w-full">
                            {user && (
                                <CommentForm userId={user.id} postId={post.id} />
                            )}
                            <SuspendedCommentsList postId={post.id} />
                        </div>

                    </div>

                    <div className="w-full lg:w-2/5 overflow-y-auto lg:border-l lg:pl-4">
                        <Suspense fallback={<BlogListingSkeleton />}>
                            <SuspendedBlogListing query={query} />
                        </Suspense>
                    </div>
                </div>
            </MaxWidthWrapper>
        </>
    )
}

export default Page
