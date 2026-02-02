"use server"

import { z } from "zod"
import slugify from "slugify"
import { postSchema } from "./schemas"
import { deletePostDb, insertPostDb, updatePostDb } from "./db"

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
        const post = await deletePostDb(
            id)

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
