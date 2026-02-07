import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
    title: string
    count: number
}
export default function StateCard({ title, count }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">{count}</p>
            </CardContent>
        </Card>

    )
}
