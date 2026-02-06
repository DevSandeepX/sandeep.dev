"use client"

import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignOutButton,
    UserButton,
} from "@clerk/nextjs"
import { Button } from "../ui/button"

export default function AdminHeader() {
    return (
        <header className="flex items-center w-full h-12 justify-end bg-blue-300 sm:pr-8 pr-4 gap-3">
            <AuthButton />
        </header>
    )
}

function AuthButton() {
    return (
        <>
            <SignedIn>
                <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
                <Button asChild>
                    <SignInButton />
                </Button>
            </SignedOut>
        </>
    )
}
