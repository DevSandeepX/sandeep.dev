"use server"

import z from "zod";
import { ratingSchema } from "./schemas";
import { insertRatingDb } from "./db";

export async function createRating(unsafeData: z.infer<typeof ratingSchema>) {
    const { success, data } = ratingSchema.safeParse(unsafeData)
    if (!success) return { success: false, message: "Invalid data recived" }

    try {
        const res = await insertRatingDb(data);
        return { success: true, message: "Thanks for your review ❤️" }
    } catch (e) {
        return { success: false, message: "Failed to submit rating" }
    }
}