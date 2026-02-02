import type { NextConfig } from "next";
import createMDX from '@next/mdx'
const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "shikimori.one",
      },
    ],
  },
  reactCompiler: true,
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
// export default nextConfig;
