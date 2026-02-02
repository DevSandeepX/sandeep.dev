import { comments } from "@/database/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function insertCommentDb(data: typeof comments.$inferInsert) {
    const [response] = await db.insert(comments).values(data).returning()
    return response
}

export async function deleteCommentDb(id: string) {
    const [response] = await db.delete(comments).where(eq(comments.id, id)).returning()
    return response
}