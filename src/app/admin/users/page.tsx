import UserTable from "@/components/admin/table/UserTable"
import { db } from "@/lib/db"
import { Suspense } from "react"

export default async function Page() {
    const users = await db.query.users.findMany()
    return (
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">

            {users && users.length > 0 ? (
                <>
                    <h2 className="text-2xl sm;text-3xl lg:text-4xl">All Users</h2>
                    <Suspense fallback={<h2>Loading...</h2>}>
                        <UserTable users={users} />
                    </Suspense>
                </>) : (
                <h2 className="text-muted-foreground">No data aviable yet.</h2>
            )}
        </div>
    )
}
