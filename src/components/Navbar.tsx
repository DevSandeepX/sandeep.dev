"use client"

import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogOutIcon, Menu, X } from "lucide-react"
import { Suspense, useState } from "react"
import Image from "next/image"
import { SignedOut, SignInButton } from "@clerk/nextjs"
import { SignedIn, SignOutButton, SignUpButton, UserAvatar } from "@clerk/clerk-react"
import { Button } from "./ui/button"

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/posts" },
]

const Navbar = () => {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b bg-white">
            <MaxWidthWrapper>
                <nav className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Image
                            src="/favicon.ico"
                            alt="Sandeep.dev"
                            width={24}
                            height={24}
                            className="aspect-square"
                        />
                        <span className="font-semibold text-lg tracking-tight">
                            Sandeep<span className="text-emerald-500">.dev</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden sm:flex items-center gap-6 lg:gap-10">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "font-semibold hover:text-blue-700",
                                        pathname.startsWith(link.href) && "underline"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <div className="flex items-center gap-2">
                            <Suspense fallback={<div className="bg-gray-600 w-12 h-6 rounded" />}>
                                <SignedIn>
                                    <UserAvatar />
                                    <Button asChild className="bg-red-600 text-white ml-6">
                                        <SignOutButton>
                                            Logout
                                        </SignOutButton>
                                    </Button>
                                </SignedIn>
                                <SignedOut>
                                    <Button asChild className="bg-blue-600 text-white">
                                        <SignInButton>Sign In</SignInButton>
                                    </Button>
                                    <Button asChild variant="outline">
                                        <SignUpButton>Sign Up</SignUpButton>
                                    </Button>
                                </SignedOut>
                            </Suspense>
                        </div>
                    </ul>

                    {/* Mobile Toggle */}
                    <button
                        className="sm:hidden"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X /> : <Menu />}
                    </button>
                </nav>
            </MaxWidthWrapper>

            {/* Mobile Dropdown */}
            {open && (
                <div className="sm:hidden border-t bg-white">
                    <MaxWidthWrapper>
                        <ul className="flex flex-col gap-4 py-4">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "block font-semibold",
                                            pathname.startsWith(link.href) && "text-blue-700"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                    <div className="w-full border-b border-zinc-800/30" />
                                </li>
                            ))}
                        </ul>
                    </MaxWidthWrapper>
                </div>
            )}
        </header>
    )
}

export default Navbar
