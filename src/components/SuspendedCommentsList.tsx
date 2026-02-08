import { comments, users } from "@/database/schema"
import { db } from "@/lib/db"
import { desc, eq } from "drizzle-orm"
import { Suspense } from "react"
import { Skeleton } from "./ui/skeleton"
import Image from "next/image"

type Props = {
    postId: string
}

const LIMIT = 10;
export default async function SuspendedCommentsList({ postId }: Props) {
    const comments = await getComments(postId)

    return (
        <Suspense fallback={<CommentSkeleton />}>
            <h2 className="mt-10 mb-4 text-2xl font-semibold ">Comments</h2>
            {(!comments || comments.length == 0) && (
                <div className="mb-10 text-muted-foreground">No Comments Yet.</div>
            )}
            <div className="flex flex-col gap-4">
                {comments.map(({ username, image, comment }) => (
                    <div
                        key={comment}
                        className="flex items-start gap-3 rounded-lg border bg-background p-3 sm:p-4"
                    >
                        {/* Avatar */}
                        <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0">
                            <Image
                                src={image}
                                alt={username}
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-1 w-full">
                            <p className="text-sm font-medium text-foreground">
                                {username}
                            </p>

                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {comment}
                            </p>
                        </div>
                    </div>
                ))}

            </div>
        </Suspense>
    )
}

function CommentSkeleton() {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton className="w-full animate-pulse" />
            <Skeleton className="w-full animate-pulse" />
            <Skeleton className="w-full animate-pulse" />
            <Skeleton className="w-full animate-pulse" />
        </div>
    )
}


async function getComments(postId: string) {
    const res = await db.select({
        comment: comments.comment,
        username: users.name,
        image: users.image
    })
        .from(comments)
        .innerJoin(users, eq(users.id, comments.userId))
        .where(eq(comments.postId, postId))
        .orderBy(desc(users.createdAt))
        .limit(LIMIT)

    return res

}