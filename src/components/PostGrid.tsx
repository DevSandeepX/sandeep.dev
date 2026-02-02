import PostCard, { Post } from "./PostCard";

export function PostGrid({ title, posts }: { title: string, posts: Post[] }) {
    return (
        <section className="flex  justify-start items-center gap-6 space-y-8 w-full">
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-800 md:text-4xl lg:text-5xl">{title}</h2>
                <div className="flex space-y-8 items-center justify-center py-6 md:py-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map(post => (
                            <PostCard key={post.id} {...post} />
                        ))}
                    </div>
                </div>
            </div>
        </section >
    )
}