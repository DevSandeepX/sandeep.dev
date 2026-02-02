import { posts } from "@/database/schema"
import { db } from "@/lib/db"
import { and, eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import Image from "next/image"
import MarkdownRenderer from "@/components/MarkdownRenderer"
import RatingForm from "@/features/rating/components/RatingForm"
import { auth } from "@clerk/nextjs/server"
import { getAverageRating } from "@/features/rating/lib/getAvgRating"

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params

    const post = await db.query.posts.findFirst({
        with: { markdown: { columns: { content: true } } },
        where: and(eq(posts.slug, slug), eq(posts.status, "published")),
    })

    if (!post) return notFound()
    const { userId } = await auth()
    const { avgRating } = await getAverageRating(post.id)

    return (
        <>
            {/* IMAGE */}
            <div className="relative w-full h-[300px] md:h-[400px] mb-6">
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
        </>
    )
}

export default Page
