"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { postSchema } from "../schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { postStatuses } from "@/database/schema";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createPost, updatePost } from "../actions";
import { toast } from "sonner";
import { actionToast } from "@/lib/actionToast";

export function PostForm({ post }: {
    post?: {
        id: string,
        title: string
        status: (typeof postStatuses)[number]
        image: string
        description: string
    }
}) {
    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            description: "",
            image: "",
            title: "",
            status: "draft",
        }
    })

    async function onSubmit(values: z.infer<typeof postSchema>) {
        const action = post == null ? createPost : updatePost.bind(null, post.id)
        const res = await action(values)
        actionToast({ ...res })
        if (res.success) form.reset()
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-4 space-y-6 items-start">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Post Title</FormLabel>
                                <FormControl>
                                    <Input {...field} className="input-clean" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Status</FormLabel>

                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full input-clean">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>

                                        <SelectContent className="w-full">
                                            {postStatuses.map((status) => (
                                                <SelectItem key={status} value={status} className="capitalize">
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col w-full gap-6 ">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cover Image URL</FormLabel>
                                <FormControl>
                                    <Input {...field} className="input-clean" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} className="min-h-48 resize-none" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-end w-full mt-3">
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}