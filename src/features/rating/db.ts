import { ratings } from "@/database/schema";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";

export async function insertRatingDb(data: typeof ratings.$inferInsert) {
    // check if rating is already aviable in db then update else create new entry

    const existing = await db.query.ratings.findFirst({
        where: and(
            eq(ratings.postId, data.postId),
            eq(ratings.userId, data.userId),
        )
    })

    if (existing) {
        const [response] = await db.update(ratings).set(data).where(eq(ratings.id, existing.id)).returning()
        return response
    } else {
        const [response] = await db.insert(ratings).values(data).returning()
        return response
    }
}

export async function deleteRatingDb(id: string) {
    const [response] = await db.delete(ratings).where(eq(ratings.id, id)).returning()
    return response

}