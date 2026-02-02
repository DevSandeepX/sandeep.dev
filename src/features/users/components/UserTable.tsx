"use client"
import { ActionButton } from '@/components/shared/ActionButton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { users } from '@/database/schema'
import { Trash2Icon } from 'lucide-react'
import { deleteUser } from '../actions'

type UserRow = Omit<
    typeof users.$inferSelect,
    "updatedAt"
>


const headres = [
    { name: "Name", dbName: "name" },
    { name: "Email", dbName: "email" },
    { name: "createdAt", dbName: "createdAt" },
]



const renderRow = (row: UserRow) => {
    return (
        <TableRow key={row.id}>

            <TableCell>{row.name}</TableCell>
            <TableCell className="capitalize">{row.email}</TableCell>
            <TableCell>
                {row.createdAt
                    ? new Date(row.createdAt).toLocaleDateString()
                    : "-"}
            </TableCell>

            {/* Action */}
            <TableCell className='flex gap-3 items-center'>
                <ActionButton requireAreYouSure action={deleteUser.bind(null, row.id)} variant="outline">
                    <Trash2Icon className='text-red-500' />
                </ActionButton>
            </TableCell>
        </TableRow>
    )
}



export default function UserTable({ users }: { users: UserRow[] }) {
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
                {users.map(renderRow)}
            </TableBody>
        </Table>
    )
}
