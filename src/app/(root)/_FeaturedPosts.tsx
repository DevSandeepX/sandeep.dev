import PostCardSkeleton from "@/components/PostCardSkelton";
import { PostGrid } from "@/components/PostGrid";
import { posts } from "@/database/schema";
import { db } from "@/lib/db";
import { asc, eq } from "drizzle-orm";
import { Suspense } from "react";

export async function FeaturedPosts() {
    const featuredPosts = await db.query.posts.findMany({
        orderBy: asc(posts.createdAt),
        where:eq(posts.status ,"published"),
        limit: 6
    })

    return (
        <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
            </div>
        }>
            <PostGrid posts={featuredPosts} title="Featured Posts" />
        </Suspense>
    )

}