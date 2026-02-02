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
        if (res.success) {
            toast(res.message)
            form.reset()
        } else {
            toast(res.message)
        }
    }

    return (
        <div className="rounded-2xl border bg-background/60 backdrop-blur p-4 shadow-sm">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-muted-foreground">
                                    Add a comment
                                </FormLabel>

                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Write your thoughts…"
                                        className="h-11 rounded border-zinc-800 bg-background px-4
                               focus-visible:ring-0 focus-visible:ring-primary
                               transition"
                                    />
                                </FormControl>

                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="transition"
                        >
                            {form.formState.isSubmitting ? "Sending..." : "Send 🚀"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
