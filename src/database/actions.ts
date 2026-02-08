"use server";

import { db } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { posts } from "./schema";


export default async function fetchPosts(page: number, limit = 6) {
    const reponse = await db.query.posts.findMany({
        where: eq(posts.status, "published"),
        limit,
        offset: (page - 1) * limit,
        orderBy: desc(posts.createdAt)
    })
    return reponse
}
