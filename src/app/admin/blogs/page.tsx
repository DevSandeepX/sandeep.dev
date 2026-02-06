import PageHeader from "@/components/admin/PageHeader";
import BlogsTable from "@/components/admin/table/BlogsTable";
import SearchForm from "@/components/shared/SearchForm";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
    const blogs = await db.query.posts.findMany({})
    return (
        <section>
            <PageHeader title="All Posts">
                <div className="flex items-start gap-6">
                    <SearchForm />
                    <Button asChild>
                        <Link href={`/admin/blogs/new`}>
                            <PlusIcon /> New Post
                        </Link>
                    </Button>
                </div>
            </PageHeader>

            <BlogsTable blogs={blogs} />
        </section>
    )
}
