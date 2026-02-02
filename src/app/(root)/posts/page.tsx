export const dynamic = "force-dynamic"


import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PostCardSkeleton from "@/components/PostCardSkelton";
import { PostGrid } from "@/components/PostGrid";
import { Suspense } from "react";


import type { Metadata } from "next"
import fetchPosts from "@/database/actions";
import { LoadMorePosts } from "@/components/LoadMorePosts";

export const metadata: Metadata = {
    title: "Blogs",
    description:
        "Read all blogs by Sandeep.dev on web development, React, Next.js, JavaScript, TypeScript, shadcn/ui, backend, and modern programming concepts.",

    keywords: [
        "Sandeep.dev blogs",
        "web development blogs",
        "Next.js blog",
        "React tutorials",
        "JavaScript articles",
        "TypeScript blog",
        "shadcn ui",
        "frontend development",
        "backend development",
        "programming tutorials",
    ],

    authors: [{ name: "Sandeep Chauhan" }],
    creator: "Sandeep Chauhan",
    publisher: "Sandeep.dev",

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },

    alternates: {
        canonical: "https://sandeep.dev/blogs",
    },

    openGraph: {
        title: "Blogs | Sandeep.dev",
        description:
            "Explore all articles on web development, React, Next.js, JavaScript, TypeScript, and modern UI libraries.",
        url: "https://sandeep.dev/blogs",
        siteName: "Sandeep.dev",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Sandeep.dev Blogs",
            },
        ],
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Blogs | Sandeep.dev",
        description:
            "Latest blogs and tutorials on React, Next.js, JavaScript, TypeScript, and modern web development.",
        images: ["/og-image.png"],
        creator: "@sandeepdev",
    },

    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/logo.png",
    },
}





const Page = async () => {
    const allBlogs = await fetchPosts(1, 6)
    return (
        <MaxWidthWrapper>
            <Suspense fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                </div>
            }>
                <PostGrid posts={allBlogs} title="All Posts" />
                <LoadMorePosts />
            </Suspense>
        </MaxWidthWrapper>
    )
}


export default Page;