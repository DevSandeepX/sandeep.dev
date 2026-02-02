import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { posts } from "./posts";
import { min } from "drizzle-orm";


export const markdowns = pgTable("markdowns", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    postId: uuid("post_id").references(() => posts.id).notNull(),
    content: text("content").notNull()
})