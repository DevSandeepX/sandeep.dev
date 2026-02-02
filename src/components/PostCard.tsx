import Link from "next/link"
import { Card } from "./ui/card"
import Image from "next/image"

export type Post = {
    id: string
    title: string
    image: string | null
    description: string | null
    slug: string
}
const PostCard = ({ title, image, description, slug, }: Post) => {
    return (
        <Link href={`/posts/${slug}`}>
            <Card className="!-pt-3">
                {image && (
                    <div className="aspect-video h-full relative">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover rounded"
                        />
                    </div>
                )}
                <div className="flex flex-col gap-2 px-2">
                    <div className="flex gap-2 items-center">
                        <div className="flex gap-2 items-center">
                            <div className="w-6 h-6 relative aspect-square">
                                <Image
                                    src="/hero.avif"
                                    alt="DevNest"
                                    fill
                                    className="object-cover rounded-full"
                                />
                            </div>
                        </div>
                        <h2 className="font-semibold line-clamp-1">{title}</h2>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="text-zinc-600 text-xs">By Devnest</span>

                    </div>
                    <p className="line-clamp-3 text-muted-foreground text-sm">{description}</p>
                </div>
            </Card>
        </Link>
    )
}

export default PostCard;