import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import { FeaturedPosts } from "./_FeaturedPosts";
import { LatestPosts } from "./_LatestPosts";

const Home = () => {
  return (
    <MaxWidthWrapper>
      <section className="flex items-center justify-between sm:flex-row flex-col sm:items-start">
        <div className="flex flex-col md:flex-row sm:text-left text-center items-center gap-4 space-y-8">
          <div className="flex gap-4 flex-col py-10 md:py-16 lg:py-32">
            <h2 className="text-4xl ms:text-4xl lg:text-6xl font-bold">Where Developers Build, Learn & Grow</h2>
            <p className="text-muted-foreground text-md">DevNest is a modern blog platform for developers where you’ll find practical tutorials, real-world coding solutions, and deep dives into web development, JavaScript, React, Next.js, and backend technologies. Learn, build, and grow—one post at a time.</p>
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src="/hero.avif"
              alt="DevNest hero image"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <FeaturedPosts />
      <LatestPosts />

    </MaxWidthWrapper >
  )
}

export default Home;