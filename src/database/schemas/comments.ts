// EVERY COMMENT BELONGS TO AN USER
// ID, USERID, COMMENT, BLOGID
// ONE BLOG HAVE MULTIPAL COMMENTS 

import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { posts } from "./posts";

export const comments = pgTable('comments', {
    id: uuid('id').notNull().primaryKey().unique().defaultRandom(),
    userId: varchar('user_id').notNull().references(() => users.id),
    postId: uuid('post_id').notNull().references(() => posts.id),
    comment: text('comment').notNull(),
})