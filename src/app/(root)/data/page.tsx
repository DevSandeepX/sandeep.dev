import { fetchAnime } from "@/app/action"
import { LoadMore } from "@/components/LoadMore"
import Image from "next/image"

export default async function Page() {
    const data: any[] = await fetchAnime(1)
    return (
        <main className="flex-flex-col max-w-6xl mx-auto">
            <h2>Explore Anime</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {data.map((d, i) => (
                    <Image
                        key={i}
                        src={`https://shikimori.one${d.image.original}`}
                        alt={d.name}
                        width={220}
                        height={180}
                        className="rounded-lg"
                    />
                ))}
            </section>
            <LoadMore />
        </main>
    )
}
