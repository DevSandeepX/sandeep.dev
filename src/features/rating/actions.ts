"use server"

import z from "zod";
import { ratingSchema } from "./schemas";
import { deleteRatingDb, insertRatingDb } from "./db";
import { revalidatePath } from "next/cache";

export async function createRating(unsafeData: z.infer<typeof ratingSchema>) {
    const { success, data } = ratingSchema.safeParse(unsafeData)
    if (!success) return { success: false, message: "Invalid data recived" }

    try {
        const res = await insertRatingDb(data);
        revalidatePath("/admin/ratings")
        return { success: true, message: "Thanks for your review ❤️" }
    } catch (e) {
        return { success: false, message: "Failed to submit rating" }
    }
}


export async function deleteRatings(id: string) {
    try {
        const res = await deleteRatingDb(id)
        revalidatePath("/admin/ratings")
        return { success: true, message: "Rating successfully deleted" }
    } catch (e) {
        return { success: true, message: "Failed to delete rating" }

    }
}