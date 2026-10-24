import type { Metadata } from "next";
import { Anton, Plus_Jakarta_Sans } from "next/font/google";
import { personal } from "@/app/data/resume";
import Motion from "./_components/Motion";
import { About, Crew, Experience, Finale, Hero, Marquee, Services, Skills, Stats, TopBar, Work } from "./_components/Sections";
import "./story.css";

const display = Anton({
  variable: "--font-sx-display",
  subsets: ["latin"],
  weight: "400",
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-sx-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const description =
  "Kishore Kumar R, full-stack developer: payment systems, SaaS platforms and AI products with RAG, vision and voice. Open to full-time roles and freelance projects.";
const shareTitle = `${personal.name} — Full-Stack Developer · Payments, SaaS and AI`;

export const metadata: Metadata = {
  title: "Story",
  description,
  openGraph: {
    type: "website",
    url: "/story",
    siteName: personal.name,
    locale: "en_US",
    title: shareTitle,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description,
    creator: "@lonewalker_666",
  },
};

export default function StoryPage() {
  return (
    <div className={`${display.variable} ${sans.variable} sx-root`}>
      <Motion>
        <TopBar />
        <main id="main-content">
          <Hero />
          <Marquee />
          <About />
          <Stats />
          <Crew />
          <Services />
          <Work />
          <Experience />
          <Skills />
          <Finale />
        </main>
        <footer className="sx-footer">
          <span>© {personal.name}</span>
        </footer>
      </Motion>
    </div>
  );
}
