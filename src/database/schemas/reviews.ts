// EVERY REVIEW BELONGS TO AN USER
// ID, USERID, REVIEW, BLOGID
// ONE BLOG HAVE MULTIPAL REVIEWS

import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { posts } from "./posts";

export const reviews = pgTable('reviews', {
    id: uuid('id').notNull().primaryKey().unique().defaultRandom(),
    userId: varchar('user_id').notNull().references(() => users.id),
    postId: uuid('post_id').notNull().references(() => posts.id),
    review: text('review').notNull(),
})