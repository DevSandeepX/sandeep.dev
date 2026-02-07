import { comments, users } from "@/database/schema"
import { CommentTable, CommentTableSkeleton } from "@/features/comments/components/CommentTable"
import { db } from "@/lib/db"
import { desc, eq } from "drizzle-orm"
import { Suspense } from "react"

export default async function Page() {
    const comments = await getComments()

    return (
        <main className="flex flex-col gap-6">
            <h2 className="text-muted-foreground text-2xl font-semibold">Comments</h2>
            <Suspense fallback={<CommentTableSkeleton />}>
                <CommentTable data={comments} />
            </Suspense>
        </main>
    )
}



async function getComments() {
    const data = await db.select({
        id: comments.id,
        username: users.name,
        message: comments.comment
    })
        .from(comments)
        .innerJoin(users, eq(comments.userId, users.id))
        .orderBy(desc(comments.comment))

    return data
}