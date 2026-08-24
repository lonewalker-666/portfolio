import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import { personal } from "@/app/data/resume";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

const siteUrl = "https://www.lonewalker.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${personal.name} — ${personal.role}`,
    template: `%s — ${personal.name}`,
  },

  description: personal.summary,

  keywords: [
    // Identity
    "Kishore Kumar R",
    "Kishore Kumar",
    "Lonewalker",

    // Primary positioning
    "Full-Stack Developer",
    "Full-Stack Engineer",
    "Backend Engineer",
    "Backend Developer",
    "Software Engineer",
    "Fintech Engineer",

    // Location / hiring intent
    "Chennai Full-Stack Developer",
    "Chennai Backend Developer",
    "Chennai Software Engineer",
    "Chennai Developer",
    "India Full-Stack Developer",
    "Remote Full-Stack Developer",
    "Freelance Full-Stack Developer",
    "Open to new opportunities",

    // Core technologies
    "Node.js Developer",
    "React Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Next.js Developer",
    "Python Developer",
    "AWS Developer",
    "Cloud Engineer",

    // Backend
    "Node.js",
    "Express.js",
    "Fastify",
    "REST APIs",
    "GraphQL",
    "Microservices",
    "Backend Architecture",
    "Backend Development",
    "Distributed Systems",
    "Asynchronous Processing",
    "Real-Time Applications",

    // Frontend
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "React Native",

    // Databases
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "Prisma",
    "Sequelize",

    // AWS / Infrastructure
    "AWS",
    "AWS EC2",
    "AWS S3",
    "AWS RDS",
    "AWS Lambda",
    "AWS SQS",
    "AWS MediaConvert",
    "CloudFront",
    "NGINX",
    "Cloud Infrastructure",
    "AWS Deployment",

    // Domain expertise
    "Fintech",
    "Payment Systems",
    "Payment Processing",
    "UPI",
    "AEPS",
    "BBPS",
    "DMT",
    "SaaS",
    "EdTech",
    "Logistics",
    "Multi-Tenant Platforms",

    // Engineering expertise
    "Payment Infrastructure",
    "Transaction Processing",
    "Payment Reconciliation",
    "Idempotent APIs",
    "System Design",
    "Backend Systems",
    "Production Systems",
    "Scalable Systems",
    "Cloud Architecture",

    // AI
    "AI Engineer",
    "LLM Engineering",
    "RAG",
    "LLM Applications",
    "AI Agents",
    "Python AI Developer",
  ],

  authors: [
    {
      name: personal.name,
      url: siteUrl,
    },
  ],

  creator: personal.name,

  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${personal.name} — ${personal.role}`,
    description: personal.summary,
    siteName: personal.name,
    locale: "en_US",
    images: [
    {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: `${personal.name} — ${personal.role}`,
    },
  ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — ${personal.role}`,
    description: personal.summary,
    images: ["/og-image.png"],
    creator: "@lonewalker_666",
  },

  alternates: {
    canonical: siteUrl,
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
      addressCountry: "IN",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
