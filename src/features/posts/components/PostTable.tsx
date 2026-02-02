import { ActionButton } from '@/components/shared/ActionButton'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { posts } from '@/database/schema'
import { PencilIcon, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { deletePost } from '../actions'
type BlogRow = Omit<
    typeof posts.$inferSelect,
    "description" | "updatedAt" | "slug"
>


const headres = [
    { name: "Image", dbName: "image" },
    { name: "Title", dbName: "title" },
    { name: "Status", dbName: "status" },
    { name: "createdAt", dbName: "createdAt" },
]



const renderRow = (row: BlogRow) => {
    return (
        <TableRow key={row.id}>
            {/* Image */}
            <TableCell>
                <div className="relative w-16 h-16">
                    <Image
                        src={row.image ?? "/placeholder.png"}
                        alt={row.title}
                        fill
                        className="object-cover rounded"
                    />
                </div>
            </TableCell>

            {/* Title */}
            <TableCell>{row.title}</TableCell>

            {/* Status */}
            <TableCell className="capitalize">{row.status}</TableCell>

            {/* Created At */}
            <TableCell>
                {row.createdAt
                    ? new Date(row.createdAt).toLocaleDateString()
                    : "-"}
            </TableCell>

            {/* Action */}
            <TableCell className='flex gap-3 items-center'>
                <Link href={`/admin/blogs/${row.id}/edit`}>
                    <PencilIcon className="h-4 w-4 text-green-500" />
                </Link>
                <ActionButton requireAreYouSure action={deletePost.bind(null, row.id)} variant="outline">
                    <Trash2Icon className='text-red-500' />
                </ActionButton>
            </TableCell>
        </TableRow>
    )
}



export default function PostTable({ blogs }: { blogs: BlogRow[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {headres.map(({ name }) => (
                        <TableHead key={name}>{name}</TableHead>
                    ))}
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {blogs.map(renderRow)}
            </TableBody>
        </Table>
    )
}
