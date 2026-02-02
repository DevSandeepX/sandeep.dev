import z from "zod";

export const commentSchema = z.object({
    userId: z.string().min(1),
    postId: z.string().min(1),
    comment: z.string().min(1, "Comment must be at least 1 charector."),
})