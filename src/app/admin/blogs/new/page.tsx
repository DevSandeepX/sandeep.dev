import PageHeader from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { PostForm } from "@/features/posts/components/PostForm";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col w-full gap-6">
            <PageHeader title="New Post">
                <Button>
                    <Link href={"/admin"}>Dashboard</Link>
                </Button>
            </PageHeader>

            <div className="w-full">
                <PostForm />
            </div>
        </div>
    )
}
