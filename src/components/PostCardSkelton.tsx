export default function PostCardSkeleton() {
    return (
        <div className="animate-pulse rounded-xl border bg-white p-4 space-y-4">
            {/* Image */}
            <div className="h-40 w-full rounded-lg bg-slate-200" />

            {/* Title */}
            <div className="h-6 w-3/4 rounded bg-slate-200" />

            {/* Description */}
            <div className="space-y-2">
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-5/6 rounded bg-slate-200" />
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 pt-2">
                <div className="h-8 w-8 rounded-full bg-slate-200" />
                <div className="h-4 w-24 rounded bg-slate-200" />
            </div>
        </div>
    )
}
