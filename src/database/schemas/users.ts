// STORE USER INFORMATION 
// ONE USER HAVE MULTIPALS COMMENTS
// ONE USER ONE POST LEAVE SINGLE RATING AND REVIEWS


import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { comments } from "./comments";
import { reviews } from "./reviews";
import { ratings } from "./ratings";


export const users = pgTable('users', {
    id: varchar('id').notNull().unique().primaryKey(),
    name: varchar('name').notNull(),
    image: varchar('image').notNull(),
    email: varchar('email').unique().notNull(),
    createdAt,
    updatedAt
})

export const userRelations = relations(users, ({ one, many }) => ({
    comments: many(comments),
    reviews: many(reviews),
    ratings: many(ratings)
}))