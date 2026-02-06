import { markdowns } from "@/database/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function insertMarkdownDb(data: typeof markdowns.$inferInsert) {
    const [res] = await db.insert(markdowns).values(data).returning()
    return res
}

export async function updateMarkdownDb(id: string, data: typeof markdowns.$inferInsert) {
    const [res] = await db.update(markdowns).set(data).where(eq(markdowns.id, id)).returning()
    return res
}
export async function deleteMarkdownDb(id: string) {
    const [res] = await db.delete(markdowns).where(eq(markdowns.id, id)).returning()
    return res
}