"use client"

import { ReactNode } from "react";

export default function PageHeader({
    title,
    children,
}: {
    title: string
    children?: ReactNode
}) {
    return (
        <header className="flex items-center justify-between py-4 border-b w-full">
            <h2 className="text-2xl font-semibold text-muted-foreground">{title}</h2>

            {children && (
                <div className="flex items-center gap-2">
                    {children}
                </div>
            )}
        </header>
    )
}
