"use client"
import { ActionButton } from '@/components/shared/ActionButton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { comments, users } from '@/database/schema'
import { Trash2Icon } from 'lucide-react'
import { deleteComments } from '../action'

type CommentRow = {
    id: string;
    userId: string;
    postId: string;
    comment: string;

}




const headres = [
    { name: "UserID", dbName: "userId" },
    { name: "PostID", dbName: "postId" },
    { name: "Comment", dbName: "comment" },
]



const renderRow = (row: CommentRow) => {
    return (
        <TableRow key={row.id}>

            <TableCell>{row.userId}</TableCell>
            <TableCell className="capitalize">{row.postId}</TableCell>
            <TableCell>
                {row.comment}
            </TableCell>

            {/* Action */}
            <TableCell className='flex gap-3 items-center'>
                <ActionButton requireAreYouSure action={deleteComments.bind(null, row.id)} variant="outline">
                    <Trash2Icon className='text-red-500' />
                </ActionButton>
            </TableCell>
        </TableRow>
    )
}



export default function CommentTable({ comments }: { comments: CommentRow[] }) {
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
                {comments.map(renderRow)}
            </TableBody>
        </Table>
    )
}
