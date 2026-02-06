import { ActionButton } from "@/components/shared/ActionButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteUser } from "@/features/users/actions";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";

type Props = {
    users: {
        id: string;
        name: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
    }[]
}

export default function UserTable({ users }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map(({ id, name, email, image, createdAt }) => (
                    <TableRow key={id}>
                        <TableCell>
                            <div className="w-12 h-8 relative">
                                <Image
                                    src={image}
                                    alt={name}
                                    fill
                                    className="aspect-video rounded"
                                />
                            </div>
                        </TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>{createdAt.toLocaleTimeString()}</TableCell>
                        <TableCell>
                            <ActionButton requireAreYouSure variant="outline" action={deleteUser.bind(null, id)}>
                                <Trash2Icon className="text-red-500" />
                            </ActionButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
