"use server"

import z from "zod";
import { commentSchema } from "./schemas";
import { deleteCommentDb, insertCommentDb } from "./db";

export async function createComment(unsafeData: z.infer<typeof commentSchema>) {
    const { success, data } = commentSchema.safeParse(unsafeData)

    if (!success) {
        return {
            success: false,
            message: "Invalid data recived"
        }
    }

    try {
        const response = await insertCommentDb(data)
        return {
            success: true,
            message: "Comment successfully submited"
        }
    } catch (e) {
        return {
            success: false,
            message: e instanceof Error ? e.message : "Internal server Error"
        }
    }

}

export async function deleteComments(id: string) {

    try {
        const response = await deleteCommentDb(id)
        return {
            success: true,
            message: "Comment successfully deleted"
        }
    } catch (e) {
        return {
            success: false,
            message: e instanceof Error ? e.message : "Internal server Error"
        }
    }

}