import { ratings } from "@/database/schema"
import { db } from "@/lib/db"
import { eq, sql } from "drizzle-orm"

export async function getAverageRating(postId: string) {
    const result = await db
        .select({
            avgRating: sql<number>`ROUND(AVG(${ratings.rating})::numeric, 1)`,
            totalRatings: sql<number>`COUNT(${ratings.id})`,
        })
        .from(ratings)
        .where(eq(ratings.postId, postId))

    return {
        avgRating: result[0]?.avgRating ?? 0,
        totalRatings: result[0]?.totalRatings ?? 0,
    }
}
