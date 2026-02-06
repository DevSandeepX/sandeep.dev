import MarkdownTable, { MarkdownTableSkelton } from "@/components/admin/table/MarkdownTable"
import { db } from "@/lib/db"
import { Suspense } from "react"

export default async function Page() {
    const markdowns = await db.query.markdowns.findMany({})
    // TODO: create loading spiner for table
    return (
        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
            <h2 className="text:2xl md:text-3xl lg:text-4xl">All Markdowns</h2>
            <Suspense fallback={<MarkdownTableSkelton />}>
                <MarkdownTable markdowns={markdowns} />
            </Suspense>
        </div>
    )
}
