"use client"
import Image from "next/image";
import Link from "next/link";

import {
    FileText,
    Users,
    MessageSquare,
    Star,
    ThumbsUp,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const ADMIN_LINKS = [
    { name: "Blogs", route: "/admin/blogs", icon: FileText },
    { name: "Users", route: "/admin/users", icon: Users },
    { name: "Comments", route: "/admin/comments", icon: MessageSquare },
    { name: "Ratings", route: "/admin/ratings", icon: Star },
    { name: "Reviews", route: "/admin/reviews", icon: ThumbsUp },
];



export default function LeftSidebar() {
    const pathname = usePathname()

    return (
        <aside className="flex flex-col gap-4 border-r border-zinc-900/30 h-screen">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-4 border-b border-white/10 bg-zinc-200">
                <div className="relative">
                    <Image
                        src="/logo.png"
                        alt="Admin"
                        width={36}
                        height={36}
                        className="rounded-full object-cover ring-2 ring-blue-500"
                    />
                    <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-gray-900" />
                </div>

                <div className="hidden sm:block leading-tight">
                    <h2 className="font-semibold text-s">
                        Dashboard
                    </h2>
                </div>
            </Link>


            <div className="flex flex-col items-center sm:items-start gap-4">
                {ADMIN_LINKS.map(({ name, route, icon: Icon }) => {
                    const regex = new RegExp(`^${route}(/|$)`)
                    const isActive = regex.test(pathname)

                    return <Link title={name} key={route} href={route} className={cn(
                        "flex w-full items-center gap-4 text-[14px] py-2 px-4 sm:pr-8 md:pr-10 lg:pr-16",
                        isActive && "bg-blue-600 text-blue-100 font-medium",
                        !isActive && "hover:bg-zinc-200"
                    )}>
                        <Icon /> <p className="hidden md:block">{name}</p>
                    </Link>
                }

                )}
            </div>
        </aside>
    )
}
