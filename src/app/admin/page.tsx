export const dynamic = "force-dynamic"
import PostChartWrapper from "@/components/admin/charts/PostChartWrapper";
import UserChartWrapper from "@/components/admin/charts/UserChartWrapper";
import { OverviewGrid } from "@/components/admin/OverviewGrid";

export default function Page() {
    return (
        <main>
            <OverviewGrid />
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <UserChartWrapper />
                <PostChartWrapper />
            </section>
        </main>
    )
}
