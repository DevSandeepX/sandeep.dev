import PageHeader from "@/components/admin/PageHeader";
import BlogsTable from "@/components/admin/table/BlogsTable";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
    const blogs = await db.query.posts.findMany({})
    return (
        <section>
            <PageHeader title="All Posts">
                <div className="flex items-start gap-6">

                    <Button asChild>
                        <Link href={`/admin/blogs/new`}>
                            <PlusIcon /> New Post
                        </Link>
                    </Button>
                </div>
            </PageHeader>

            <Suspense fallback={<h2>Loading...</h2>}>
                <BlogsTable blogs={blogs} />
            </Suspense>
        </section>
    )
}
