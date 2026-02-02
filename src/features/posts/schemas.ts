// features/posts/schemas.ts
import { postStatusEnum, postStatuses } from "@/database/schema";
import { z } from "zod";

export const postSchema = z.object({
    title: z.string().min(3, "Title is required"),
    description: z.string().min(10, "Description is required"),
    image: z.string().url("Invalid image URL"),
    status: z.enum(postStatuses),
});
