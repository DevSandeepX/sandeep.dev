import { relations } from "drizzle-orm"
import {
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar
} from "drizzle-orm/pg-core"
import { markdowns } from "./markdowns"
import { comments } from "./comments"
import { reviews } from "./reviews"
import { ratings } from "./ratings"

export const postStatuses = ["draft", "published"] as const
export type PostStatus = (typeof postStatuses)[number]
export const postStatusEnum = pgEnum("post_status", postStatuses)

export const posts = pgTable("posts", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    image: text("image"),
    status: postStatusEnum("status").default("draft").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().$onUpdate(() => new Date()),
})

export const postRelations = relations(posts, ({ one, many }) => ({
    markdown: one(markdowns, {
        fields: [posts.id],
        references: [markdowns.postId],
    }),
    comments: many(comments),
    reviews: many(reviews),
    ratings: many(ratings),
}))

