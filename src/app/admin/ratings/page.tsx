import { RatingTable } from "@/components/admin/table/RatingTable"
import { ratings, users } from "@/database/schema"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { Suspense } from "react"

export default async function Page() {
    const data = await getRatingData()
    return (
        <main className="flex flex-col gap-6">
            <h2 className="text-muted-foreground text-2xl font-semibold">Ratings</h2>
            <Suspense>
                <RatingTable data={data} />
            </Suspense>
        </main>
    )
}



async function getRatingData() {
    const result = await db.select({
        id: ratings.id,
        username: users.name,
        rating: ratings.rating
    })
        .from(ratings)
        .innerJoin(users, eq(ratings.userId, users.id))
        .orderBy(ratings.rating)

    return result
}