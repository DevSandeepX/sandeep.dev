import z from "zod";

export const markdownSchema = z.object({
    postId: z.string(),
    content: z.string()

})