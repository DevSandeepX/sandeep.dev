"use server"
import z from "zod";
import { markdownSchema } from "./schema";
import { deleteMarkdownDb, insertMarkdownDb, updateMarkdownDb } from "./db";
import { revalidatePath } from "next/cache";

export async function createMarkdown(unsafeData: z.infer<typeof markdownSchema>) {
    const { success, data } = markdownSchema.safeParse(unsafeData)
    if (!success) {
        return { success: false, message: "Invalid data recived" }
    }

    // TODO 
    // Revalidate consumer side cache

    try {
        const markdown = await insertMarkdownDb(data)
        revalidatePath(`/admin/markdowns`)
        revalidatePath(`/admin/blogs/${markdown.postId}/markdowns`)
        revalidatePath(`/admin/blogs/${markdown.postId}/markdowns/new`)
        return { success: true, message: "Markdown successfully created" }
    } catch (e) {
        return { success: false, message: "Failed to create markdown" }
    }
}

export async function updateMarkdown(id: string, unsafeData: z.infer<typeof markdownSchema>) {
    const { success, data } = markdownSchema.safeParse(unsafeData)
    if (!success) {
        return { success: false, message: "Invalid data recived" }
    }

    // TODO 
    // Revalidate consumer side cache

    try {
        const markdown = await updateMarkdownDb(id, data)
        revalidatePath(`/admin/markdowns`)
        revalidatePath(`/admin/blogs/${markdown.postId}/markdowns`)
        revalidatePath(`/admin/blogs/${markdown.postId}/markdowns/${markdown.id}`)
        revalidatePath(`/admin/blogs/${markdown.postId}/markdowns/new`)

        return { success: true, message: "Markdown successfully updated" }
    } catch (e) {
        return { success: false, message: "Failed to update markdown" }
    }
}

export async function deleteMarkdown(id: string) {


    // TODO 
    // Revalidate consumer side cache

    try {
        const markdown = await deleteMarkdownDb(id)
        revalidatePath(`/admin/markdowns`)
        revalidatePath(`/admin/blogs/${markdown.postId}/markdowns`)
        revalidatePath(`/admin/blogs/${markdown.postId}/markdowns/new`)

        return { success: true, message: "Markdown successfully deleted" }
    } catch (e) {
        return { success: false, message: "Failed to delete markdown" }
    }
}