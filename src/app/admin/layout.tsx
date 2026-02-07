import AdminHeader from "@/components/admin/AdminHeader"
import LeftSidebar from "@/components/admin/LeftSidebar"
import { ReactNode } from "react"

export default function AdminLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <div className="min-h-screen">
            {/* Left Sidebar */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-[60px] md:w-[200px]">
                <LeftSidebar />
            </aside>

            {/* Main Area */}
            <div className="ml-[60px] md:ml-[200px]">
                {/* Header */}
                <header className="fixed top-0 right-0 z-30 h-12 w-[calc(100%-60px)] md:w-[calc(100%-200px)]">
                    <AdminHeader />
                </header>

                {/* Scrollable Content */}
                <main className="mt-12 min-h-[calc(100vh-3rem)] overflow-y-auto p-4">
                    {children}
                </main>
            </div>
        </div>
    )
}
