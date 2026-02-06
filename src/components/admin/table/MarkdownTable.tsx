import { ActionButton } from "@/components/shared/ActionButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteMarkdown } from "@/features/markdowns/actions";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

type Props = {
    markdowns: {
        id: string;
        postId: string;
        content: string;
    }[]
}

export default function MarkdownTable({ markdowns }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Post ID</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {markdowns.map(({ id, content, postId }) => (
                    <TableRow key={id}>
                        <TableCell>{content.slice(0, 20)}</TableCell>
                        <TableCell>{postId}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Link href={`/admin/blogs/${postId}/markdowns/new`}>
                                    <PencilIcon className="text-blue-600 size-4" />
                                </Link>
                                <ActionButton requireAreYouSure variant="outline" action={deleteMarkdown.bind(null, id)}>
                                    <Trash2Icon className="text-red-600 size-4" />
                                </ActionButton>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export function MarkdownTableSkelton() {
    return (
        <section className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-3 gap-6">
                <div className="h-10 bg-red-700 rounded animate-pulse" />
                <div className="h-10 bg-red-700 rounded animate-pulse" />
                <div className="h-10 bg-red-700 rounded animate-pulse" />
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="h-10 bg-gray-300 rounded animate-pulse" />
                <div className="h-10 bg-gray-300 rounded animate-pulse" />
                <div className="h-10 bg-gray-300 rounded animate-pulse" />
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="h-10 bg-gray-300 rounded animate-pulse" />
                <div className="h-10 bg-gray-300 rounded animate-pulse" />
                <div className="h-10 bg-gray-300 rounded animate-pulse" />
            </div>
        </section>
    )
}

