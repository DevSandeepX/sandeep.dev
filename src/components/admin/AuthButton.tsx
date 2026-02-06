import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { Button } from "../ui/button"

export default async function AuthButton() {
    const { sessionClaims } = await auth()
    const role = (sessionClaims?.publicMetadata as { role: string })?.role

    if (role !== "admin") return null

    return (
        <Button asChild size="sm" variant="secondary">
            <Link href="/admin">Admin</Link>
        </Button>
    )
}
