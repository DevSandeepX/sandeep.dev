import { pgTable, uuid, varchar, integer, uniqueIndex } from "drizzle-orm/pg-core";

// RATING SCHEMA
// RATING BELONGS TO AN USER
// ONE USER GIVE RATING ONLY ONE
// RATING ALWAYES WILL BE BETWEEN 1-5
// ONE BLOG HAVE MULTIPAL RATING

export const ratings = pgTable('ratings', {
    id: uuid('id').notNull().defaultRandom().defaultRandom(),
    userId: varchar('user_id').notNull(),
    postId: uuid('post_id').notNull(),
    rating: integer('rating').notNull()
},)