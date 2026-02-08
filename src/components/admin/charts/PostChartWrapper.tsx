export const dynamic = "force-dynamic"
import { posts, users } from "@/database/schema";
import { db } from "@/lib/db"
import { sql } from "drizzle-orm";
import UserChart from "./UserChart";

export default async function PostChartWrapper() {
    const data = await getPostChartData()
    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold my-6 text-muted-foreground">All Post</h2>
            <UserChart data={data} />
        </div>
    )
}


export async function getPostChartData() {
    const result = await db.execute(sql`
    SELECT
      DATE(created_at) AS date,
      COUNT(*)::int AS total
    FROM ${posts}
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at)
  `)

    return result.rows as { date: string; total: number }[]
}