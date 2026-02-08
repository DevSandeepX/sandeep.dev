"use server"

import { string, z } from "zod"
import slugify from "slugify"
import { postSchema } from "./schemas"
import { deletePostDb, insertPostDb, updatePostDb } from "./db"
import { revalidatePath } from "next/cache"
import { createMarkdown } from "../markdowns/actions"
import { db } from "@/lib/db"
import { and, desc, eq, ilike } from "drizzle-orm"
import { posts } from "@/database/schema"

function generateSlug(title: string) {
    return slugify(title, {
        lower: true,
        strict: true,
        trim: true,
    })
}

export async function createPost(
    unsafeData: z.infer<typeof postSchema>
) {
    // 1️⃣ Validate
    const parsed = postSchema.safeParse(unsafeData)

    if (!parsed.success) {
        return {
            success: false,
            message: "Invalid data received",
        }
    }

    try {
        // 2️⃣ Insert
        const post = await insertPostDb({
            ...parsed.data,
            slug: generateSlug(parsed.data.title),
        })

        await createMarkdown({
            postId: post.id,
            content: ""
        })
        revalidatePath("/posts")
        revalidatePath("/admin/blogs")
        revalidatePath("/admin/markdowns")
        revalidatePath(`posts/${post.slug}`)

        return {
            success: true,
            message: "Successfully created your post",
            data: post,
        }
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to create post",
        }
    }
}

export async function deletePost(
    id: string,
) {



    try {
        // 2️⃣ Insert
        const post = await deletePostDb(id)
        revalidatePath("/posts")
        revalidatePath("/admin/blogs")
        return {
            success: true,
            data: post,
            message: "Successfully deleted your post"
        }
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update post",
        }
    }
}
export async function updatePost(
    id: string,
    unsafeData: z.infer<typeof postSchema>
) {
    // 1️⃣ Validate
    const parsed = postSchema.safeParse(unsafeData)

    if (!parsed.success) {
        return {
            success: false,
            message: "Invalid data received",
        }
    }

    try {
        // 2️⃣ Insert
        const post = await updatePostDb({
            id, data: {
                ...parsed.data,
                slug: generateSlug(parsed.data.title),
            }
        })

        revalidatePath("/posts")
        revalidatePath("/admin/blogs")
        revalidatePath(`/posts/${post.id}`)

        return {
            success: true,
            data: post,
            message: "Successfully updated your post"
        }
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update post",
        }
    }
}



// get actions

const PAGE_PER_ITEM = 6
export async function fetchPostList({ page, query }: { page: number, query?: string }) {
    const conditions = [eq(posts.status, "published")]
    if (query?.trim) {
        conditions.push(ilike(posts.title, `%${query}%`))
    }

    const res = await db.query.posts.findMany({
        columns: { slug: true, title: true },
        where: and(...conditions),
        limit: PAGE_PER_ITEM,
        offset: (page - 1) * PAGE_PER_ITEM,
        orderBy: (posts, { desc }) => desc(posts.createdAt)
    })

    return res
}
