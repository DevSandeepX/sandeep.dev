import { ActionButton } from '@/components/shared/ActionButton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { deletePost } from '@/features/posts/actions';
import { BookOpenIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogsTable({ blogs }: {
    blogs: {
        id: string;
        title: string;
        description: string | null;
        slug: string;
        image: string | null;
        status: "draft" | "published";
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className='hidden sm:table-cell'>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {blogs.map(blog => (
                    <TableRow key={blog.id}>
                        <TableCell>
                            <div className='relative w-12 h-8'>
                                <Image
                                    src={blog.image as string}
                                    alt={blog.title}
                                    fill
                                    className='aspect-video rounded'
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                            {blog.title.slice(1, 20)}...
                        </TableCell>
                        <TableCell className='hidden sm:table-cell'>
                            {blog.createdAt?.toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                            <div className='flex gap-2 items-center'>
                                <Link href={`/admin/blogs/${blog.id}/edit`}>
                                    <PencilIcon className='text-green-500 size-4' />
                                </Link>
                                <ActionButton variant="outline" requireAreYouSure action={deletePost.bind(null, blog.id)}>
                                    <Trash2Icon className='text-red-500' />
                                </ActionButton>
                                <Link href={`/admin/blogs/${blog.id}/markdowns/new`} className='flex gap-2 items-center'>
                                    <BookOpenIcon className='text-blue-700' />   Write Content
                                </Link>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
