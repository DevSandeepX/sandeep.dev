import AdminHeader from "@/components/admin/AdminHeader";
import LeftSidebar from "@/components/admin/LeftSidebar";
import { ReactNode } from "react";

export default function AdminLayout({ children }: {
    children: ReactNode
}) {
    return (
        <div className="grid md:grid-cols-[200px_1fr] grid-cols-[60px_1fr] min-h-screen">
            <LeftSidebar />
            <div className="flex flex-col">
                <AdminHeader />
                <main className="p-4">
                    {children}
                </main>
            </div>
        </div>

    )
}
