"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { commentSchema } from "@/features/comments/schemas"
import z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { createComment } from "@/features/comments/action"
import { toast } from "sonner"
import { actionToast } from "@/lib/actionToast"

type CommentProps = {
    userId: string
    postId: string
}

type NewComment = z.infer<typeof commentSchema>

export function CommentForm({ userId, postId }: CommentProps) {
    const form = useForm<NewComment>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            postId,
            userId,
            comment: "",
        },
    })

    async function onSubmit(data: NewComment) {
        const res = await createComment(data)
        actionToast(res)
    }

    return (
        <div className="w-full rounded-2xl border bg-background/60 backdrop-blur p-4 sm:p-6 shadow-sm">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col sm:flex-row gap-3 sm:items-end"
                >
                    {/* Comment Input */}
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-sm text-muted-foreground">
                                    Add a comment
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Write your thoughts…"
                                        className="h-11 w-full rounded-md border border-zinc-300 dark:border-zinc-800
                               bg-background px-4 focus-visible:ring-2
                               focus-visible:ring-primary transition"
                                    />
                                </FormControl>

                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="h-11 w-full sm:w-auto px-6"
                    >
                        {form.formState.isSubmitting ? "Sending..." : "Send 🚀"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
