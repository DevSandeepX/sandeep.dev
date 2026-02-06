import PageHeader from '@/components/admin/PageHeader'
import { Button } from '@/components/ui/button'
import { posts } from '@/database/schema'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MarkdownForm from '@/components/admin/forms/MarkdownForm'
import MarkdownRenderer from '@/components/MarkdownRenderer'

export default async function Page({ params }: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params

    const blog = await db.query.posts.findFirst({
        where: eq(posts.id, id),
        with: { markdown: { columns: { id: true, postId: true, content: true } } },
        columns: { id: true, title: true }
    })

    if (!blog) return notFound()

    return (
        <main className='flex flex-col items-start'>
            <PageHeader title={blog.title}>
                <Button>
                    <Link href={"/admin"}>Dashboard</Link>
                </Button>
            </PageHeader>
            <section className='w-full'>
                <Tabs defaultValue="code" className="w-full">
                    <TabsList>
                        <TabsTrigger value="code">Code</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="code">
                        <MarkdownForm postId={blog.id} markdown={blog.markdown} />
                    </TabsContent>
                    <TabsContent value="preview">
                        <MarkdownRenderer content={blog.markdown.content} />
                    </TabsContent>
                </Tabs>
            </section>
        </main>
    )
}
