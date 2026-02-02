import { users } from "@/database/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function insertUser(data: typeof users.$inferInsert) {
    const [respone] = await db.insert(users).values(data).returning()
    if (!respone) throw new Error("Failed to insert user in db.")
    return respone
}

export async function updateUser(id: string, data: Partial<typeof users.$inferInsert>) {
    const [respone] = await db.update(users).set(data).where(eq(users.id, id)).returning()
    if (!respone) throw new Error("Failed to update user in db.")
    return respone
}

export async function deleteUserDb({ id }: { id: string }) {
    const [respone] = await db.delete(users).where(eq(users.id, id)).returning()
    return respone
}