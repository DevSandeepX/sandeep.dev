import "dotenv/config"
import { db } from "@/lib/db"
import { comments, markdowns, posts, postStatusEnum, ratings, reviews } from "@/database/schema"

const seedPosts = [
    {
        title: "Getting Started with Next.js 15",
        description: "A beginner-friendly guide to start building apps with Next.js.",
        slug: "getting-started-with-nextjs-15",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        status: "published" as const,
    },
    {
        title: "Understanding React Server Components",
        description: "Learn how Server Components work internally in React.",
        slug: "understanding-react-server-components",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        status: "published" as const,
    },
    {
        title: "Tailwind CSS Tips for Clean UI",
        description: "Practical Tailwind CSS tips for modern interfaces.",
        slug: "tailwind-css-tips-for-clean-ui",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        status: "published" as const,
    },
    {
        title: "Drizzle ORM Pagination Explained",
        description: "Implement offset and cursor-based pagination using Drizzle ORM.",
        slug: "drizzle-orm-pagination-explained",
        image: "https://images.unsplash.com/photo-1526378722484-d0ce1e4d0b6b",
        status: "published" as const,
    },
    {
        title: "How UUID Works in Databases",
        description: "Understand UUIDs and why they are useful in distributed systems.",
        slug: "how-uuid-works-in-databases",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
        status: "published" as const,
    },

    // ---------- DRAFT POSTS ----------
    {
        title: "Building Infinite Scroll in Next.js",
        description: "Step-by-step guide to build infinite scrolling UI.",
        slug: "building-infinite-scroll-in-nextjs",
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd",

    },
    {
        title: "SEO Best Practices for Blogs",
        description: "Improve search rankings with proper SEO techniques.",
        slug: "seo-best-practices-for-blogs",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",

    },
    {
        title: "Next.js Metadata API Deep Dive",
        description: "Dynamic metadata handling in Next.js App Router.",
        slug: "nextjs-metadata-api-deep-dive",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",

    },
    {
        title: "Using MDX in Production",
        description: "Best practices for using MDX safely in large projects.",
        slug: "using-mdx-in-production",
        image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",

    },
    {
        title: "GraphQL vs REST APIs",
        description: "A comparison between GraphQL and REST architectures.",
        slug: "graphql-vs-rest-apis",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",

    },

    // ---------- MORE POSTS ----------
    {
        title: "Deploying Next.js on Vercel",
        description: "A complete deployment guide for Next.js apps.",
        slug: "deploying-nextjs-on-vercel",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
        status: "published" as const,
    },
    {
        title: "Authentication in Next.js App Router",
        description: "Learn modern authentication patterns in Next.js.",
        slug: "authentication-in-nextjs-app-router",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
        status: "published" as const,
    },
    {
        title: "Optimizing Images with next/image",
        description: "Improve performance using Next.js Image component.",
        slug: "optimizing-images-with-next-image",
        image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29",
        status: "published" as const,
    },
    {
        title: "Server Actions Explained",
        description: "Everything you need to know about Server Actions.",
        slug: "server-actions-explained",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        status: "published" as const,
    },
    {
        title: "Handling Forms in Next.js",
        description: "Client and server-side form handling patterns.",
        slug: "handling-forms-in-nextjs",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        status: "published" as const,
    },

    // ---------- FINAL 5 ----------
    {
        title: "Caching Strategies in Next.js",
        description: "Understand caching layers in modern web apps.",
        slug: "caching-strategies-in-nextjs",
        image: "https://images.unsplash.com/photo-1527430253228-e93688616381",

    },
    {
        title: "Building a Blog with Drizzle ORM",
        description: "A full blog system using Drizzle and Next.js.",
        slug: "building-a-blog-with-drizzle-orm",
        image: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9",
        status: "published" as const,
    },
    {
        title: "Pagination vs Infinite Scroll",
        description: "UX comparison between pagination and infinite scrolling.",
        slug: "pagination-vs-infinite-scroll",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        status: "published" as const,
    },
    {
        title: "Database Indexing Basics",
        description: "Improve query performance using indexes.",
        slug: "database-indexing-basics",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",

    },
    {
        title: "Content Management with MDX",
        description: "Using MDX as a content layer for blogs.",
        slug: "content-management-with-mdx",
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        status: "published" as const,
    },
]

async function seed() {
    await db.delete(markdowns)
    await db.delete(comments)
    await db.delete(ratings)
    await db.delete(reviews)
    await db.delete(posts)
    process.exit(0)
}

seed().catch((err) => {
    console.error("❌ Seeding failed", err)
    process.exit(1)
})
