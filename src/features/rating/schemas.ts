import z from "zod";

export const ratingSchema = z.object({
    postId: z.string(),
    userId: z.string(),
    rating: z.number().min(1).max(5)
})