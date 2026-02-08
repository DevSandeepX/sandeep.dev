import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type TestimonialProps = {
    feedback: string
    image?: string | null
    username: string
}

export function TestimonialCard({
    feedback,
    image,
    username,
}: TestimonialProps) {
    return (
        <Card className="w-full rounded-2xl border bg-background shadow-sm
        transition-all ease-out
        hover:shadow-md hover:translate-y-1">
            <CardContent className="p-6 space-y-4">
                {/* Feedback */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                    “{feedback}”
                </p>

                {/* User */}
                <div className="flex items-center gap-3 pt-2">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={image ?? undefined} alt={username} />
                        <AvatarFallback>
                            {username.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <p className="text-sm font-medium">{username}</p>
                </div>
            </CardContent>
        </Card>
    )
}
