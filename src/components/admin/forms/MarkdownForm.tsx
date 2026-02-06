"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { createMarkdown, updateMarkdown } from '@/features/markdowns/actions'
import { markdownSchema } from '@/features/markdowns/schema'
import { actionToast } from '@/lib/actionToast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

export default function MarkdownForm({ postId, markdown }: {
    postId: string
    markdown?: {
        id: string,
        postId: string
        content: string
    }
}) {

    const form = useForm<z.infer<typeof markdownSchema>>({
        resolver: zodResolver(markdownSchema),
        defaultValues: {
            postId,
            content: markdown?.content ?? ""
        }
    })

    async function onSubmit(values: z.infer<typeof markdownSchema>) {
        const action = markdown == null ? createMarkdown : updateMarkdown.bind(null, markdown.id)
        const res = await action(values)
        actionToast({ ...res })
        if (res.success) form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} className="min-h-96 resize-none w-full" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end w-full mt-3">
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>
            <div>MarkdownForm</div>
        </Form>
    )
}
