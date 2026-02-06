"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, Suspense, ReactNode } from "react"
import { Menu, X } from "lucide-react"

import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/nextjs"

import MaxWidthWrapper from "./MaxWidthWrapper"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/posts" },
]

const NavbarClient = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    return (
        <>
            <MaxWidthWrapper>
                <nav className="flex h-16 items-center justify-between">

                    {/* Left */}
                    <div className="flex items-center gap-4">
                        <Image src="/favicon.ico" alt="Sandeep.dev" width={24} height={24} />
                        <span className="font-semibold text-lg">
                            Sandeep<span className="text-emerald-500">.dev</span>
                        </span>

                        {/* Admin Button (Desktop only) */}
                        <div className="hidden sm:block">
                            {children}
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden sm:flex items-center gap-6">
                        {navLinks.map(link => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "font-medium hover:text-blue-600",
                                        pathname === link.href && "underline"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        <Suspense fallback={<div className="w-9 h-9 rounded-full bg-gray-200" />}>
                            <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>

                            <SignedOut>
                                <Button asChild size="sm">
                                    <SignInButton />
                                </Button>
                                <Button asChild size="sm" variant="outline">
                                    <SignUpButton />
                                </Button>
                            </SignedOut>
                        </Suspense>
                    </ul>

                    {/* Mobile toggle */}
                    <button className="sm:hidden" onClick={() => setOpen(!open)}>
                        {open ? <X /> : <Menu />}
                    </button>
                </nav>
            </MaxWidthWrapper>

            {/* Mobile Menu */}
            {open && (
                <div className="sm:hidden border-t bg-white">
                    <MaxWidthWrapper>
                        <div className="flex flex-col gap-4 py-4">

                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                        "font-medium",
                                        pathname === link.href && "text-blue-600"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Mobile Admin Button */}
                            {children}

                            <div className="pt-4 border-t flex flex-col gap-2">
                                <SignedIn>
                                    <UserButton afterSignOutUrl="/" />
                                </SignedIn>

                                <SignedOut>
                                    <Button asChild>
                                        <SignInButton />
                                    </Button>
                                    <Button asChild variant="outline">
                                        <SignUpButton />
                                    </Button>
                                </SignedOut>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </div>
            )}
        </>
    )
}

export default NavbarClient
