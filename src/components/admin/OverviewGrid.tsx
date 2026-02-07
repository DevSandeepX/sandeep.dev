import { comments, markdowns, posts, users } from "@/database/schema"
import { db } from "@/lib/db"
import { sql } from "drizzle-orm"
import StateCard from "./cards/StateCard"
import { Suspense } from "react"

type DashboardCounts = {
    posts: number
    comments: number
    users: number
    markdowns: number
}

export async function OverviewGrid() {
    const data = await getDashboardCounts()

    return (
        <Suspense fallback={
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="bg-gray-500 p-4 rounded h-32 w-full" />
                <div className="bg-gray-500 p-4 rounded h-32 w-full" />
                <div className="bg-gray-500 p-4 rounded h-32 w-full" />
                <div className="bg-gray-500 p-4 rounded h-32 w-full" />
            </div>
        }>
            <main className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <StateCard title="Total Users" count={data.users} />
                <StateCard title="Total Posts" count={data.posts} />
                <StateCard title="Total Comments" count={data.comments} />
                <StateCard title="Total Markdown" count={data.markdowns} />
            </main>
        </Suspense>
    )
}

async function getDashboardCounts(): Promise<DashboardCounts> {
    const result = await db.execute(sql`
    SELECT
      (SELECT COUNT(*) FROM ${posts})::int AS posts,
      (SELECT COUNT(*) FROM ${comments})::int AS comments,
      (SELECT COUNT(*) FROM ${users})::int AS users,
      (SELECT COUNT(*) FROM ${markdowns})::int AS markdowns
  `)

    return result.rows[0] as { posts: number, comments: number, users: number, markdowns: number }
}
