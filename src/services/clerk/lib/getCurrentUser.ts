import { users } from "@/database/schema";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getCurrentUser() {
    const { userId } = await auth()
    if (userId == null) return null;
    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
        columns: { id: true }
    })

    if (user == null) return null
    return user

}