import Link from "next/link"
import { ArrowLeft, Terminal } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
            <div className="max-w-md text-center space-y-6">
                {/* Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                    <Terminal className="h-8 w-8 text-primary" />
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-bold tracking-tight">
                    404 — Page Not Found
                </h1>

                {/* Description */}
                <p className="text-muted-foreground">
                    Looks like you’ve hit a broken route.
                    The page you’re looking for doesn’t exist or was moved.
                </p>

                {/* Actions */}
                <div className="flex items-center justify-center gap-3 pt-2">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Go Home
                    </Link>

                    <Link
                        href="/posts"
                        className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition"
                    >
                        Read Blogs
                    </Link>
                </div>

                {/* Footer hint */}
                <p className="pt-6 text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Sandeep.dev
                </p>
            </div>
        </div>
    )
}
