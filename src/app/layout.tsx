import type { Metadata } from "next";
import { Toaster } from "sonner"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "Sandeep.dev",
    template: "%s | Sandeep.dev",
  },
  description:
    "Sandeep.dev is a modern developer blog focused on Next.js, React, shadcn/ui, Tailwind CSS, and full-stack web development.",

  keywords: [
    "Sandeep.dev",
    "Web Development Blog",
    "Next.js",
    "React",
    "shadcn ui",
    "Tailwind CSS",
    "JavaScript",
    "TypeScript",
    "Full Stack Developer",
  ],

  authors: [{ name: "Sandeep Chauhan" }],
  creator: "Sandeep Chauhan",

  metadataBase: new URL("https://sandeep.dev"), // change if domain differs

  openGraph: {
    title: "Sandeep.dev",
    description:
      "A modern developer blog sharing tutorials, tips, and projects on Next.js, React, and shadcn/ui.",
    url: "https://sandeep.dev",
    siteName: "Sandeep.dev",
    images: [
      {
        url: "/og-image.png", // optional (recommended)
        width: 1200,
        height: 630,
        alt: "Sandeep.dev – Developer Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sandeep.dev",
    description:
      "Modern developer blog about Next.js, React, shadcn/ui, and web development.",
    images: ["/og-image.png"],
    creator: "@yourtwitter", // optional
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // optional
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster position="top-right" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
