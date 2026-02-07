import { ActionButton } from '@/components/shared/ActionButton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2Icon } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton"
import { deleteRatings } from '@/features/rating/actions';
type Props = {
    data: {
        id: string;
        username: string;
        rating: number;
    }[]
}
export function RatingTable({ data }: Props) {
    if (data.length == 0 || !data) {
        return (
            <div>No Comment Aviable</div>
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Ratings</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(({ id, username, rating }) => (
                    <TableRow key={id}>
                        <TableCell>{username}</TableCell>
                        <TableCell className='line-clamp-1'>{rating}</TableCell>
                        <TableCell>
                            <ActionButton variant="outline" requireAreYouSure action={deleteRatings.bind(null, id)}>
                                <Trash2Icon className='text-red-400' />
                            </ActionButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}


type SkeltonProps = {
    rows?: number
}

export function CommentTableSkeleton({ rows = 5 }: SkeltonProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {Array.from({ length: rows }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Skeleton className="h-4 w-24" />
                        </TableCell>

                        <TableCell>
                            <Skeleton className="h-4 w-full max-w-[400px]" />
                        </TableCell>

                        <TableCell>
                            <Skeleton className="h-8 w-8 rounded-md" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
