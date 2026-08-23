import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import { personal } from "@/app/data/resume";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = "https://portfolio-eight-cyan-bcmtc3awoy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personal.name} — ${personal.role}`,
    template: `%s — ${personal.name}`,
  },
  description: personal.summary,
  keywords: [
    "Kishore Kumar R",
    "Full-Stack Developer",
    "Node.js Developer",
    "React Developer",
    "Fintech Engineer",
    "Microservices",
    "Chennai Developer",
  ],
  authors: [{ name: personal.name, url: siteUrl }],
  creator: personal.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${personal.name} — ${personal.role}`,
    description: personal.summary,
    siteName: personal.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — ${personal.role}`,
    description: personal.summary,
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.role,
    email: personal.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: personal.location,
    },
    url: siteUrl,
    sameAs: [personal.links.linkedin, personal.links.github],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased bg-bg text-ink`}
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-signal focus:text-bg focus:px-4 focus:py-2 focus:rounded-md focus:font-mono focus:text-sm"
          >
            Skip to content
          </a>
          <ScrollProgress />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
