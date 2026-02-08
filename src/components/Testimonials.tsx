export const dynamic = "force-dynamic"

import { comments, users } from "@/database/schema"
import { db } from "@/lib/db"
import { desc, eq } from "drizzle-orm"
import { TestimonialCard } from "./TestimonialCard"
import { Suspense } from "react"
import { Skeleton } from "./ui/skeleton"

export default async function Testimonials() {
    const testimonials = await getTestimonials()

    return (
        <div className="my-4 md:my-8">
            <h2 className="text-2xl md:text-4xl font-semibold mb-2 text-muted-foreground">
                Happy Customers
            </h2>

            {/* Accent Line */}
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary/40 mb-6 md:mb-8" />

            <Suspense fallback={<TestimonialSkeleton />}>
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <TestimonialCard {...t} key={i} />
                    ))}
                </section>
            </Suspense>
        </div>

    )
}


function TestimonialSkeleton() {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-16 w-full animate-pulse" />
        <Skeleton className="h-16 w-full animate-pulse" />
        <Skeleton className="h-16 w-full animate-pulse" />
    </div>
}

async function getTestimonials() {
    const res = await db.select({
        feedback: comments.comment,
        image: users.image,
        username: users.name,
    })
        .from(comments)
        .innerJoin(users, eq(users.id, comments.userId))
        .orderBy(desc(comments.comment))
        .limit(3)
    return res
}