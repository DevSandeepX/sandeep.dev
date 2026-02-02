"use client"

import { PlusIcon } from "lucide-react";
import SearchForm from "../shared/SearchForm";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function PageHeader() {

    const pathname = usePathname();
    return (
        <main className="flex gap-6 justify-end items-center py-2">
            <SearchForm />
            <Button variant="outline">
                <Link href={`${pathname}/new`} className="flex gap-2 items-center">
                    <PlusIcon />
                    <p>New</p>
                </Link>
            </Button>
        </main>
    )
}
