import { posts } from "@/database/schema"
import { db } from "@/lib/db"
import { eq, InferInsertModel } from "drizzle-orm"

type NewPost = InferInsertModel<typeof posts>

export async function insertPostDb(data: NewPost) {
    const [res] = await db
        .insert(posts)
        .values(data)
        .returning()

    return res
}
export async function updatePostDb({ id, data }: {
    id: string,
    data: NewPost
}) {
    const [res] = await db
        .update(posts)
        .set(data)
        .where(eq(posts.id, id))
        .returning()

    return res
}
export async function deletePostDb(
    id: string
) {
    const [res] = await db
        .delete(posts)
        .where(eq(posts.id, id))
        .returning()

    return res
}
