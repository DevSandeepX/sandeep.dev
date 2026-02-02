"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ratingSchema } from "../schemas"
import z from "zod"
import { toast } from "sonner"
import { createRating } from "../actions"

export default function RatingForm({
    postId,
    userId,
}: {
    postId: string
    userId: string
}) {
    const [hover, setHover] = useState(0)

    const form = useForm<z.infer<typeof ratingSchema>>({
        resolver: zodResolver(ratingSchema),
        defaultValues: {
            postId,
            userId,
            rating: 0,
        },
    })

    const {
        handleSubmit,
        setValue,
        watch,
    } = form

    const rating = watch("rating")

    async function onSubmit(data: z.infer<typeof ratingSchema>) {
        const res = await createRating(data)
        toast(res.message)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <main className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={22}
                        className={`cursor-pointer transition ${(hover || rating) >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                            }`}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => {
                            setValue("rating", star, { shouldValidate: true })
                            handleSubmit(onSubmit)()
                        }}
                    />
                ))}
            </main>
        </form>
    )
}
