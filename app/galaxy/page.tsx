import type { Metadata } from "next";
import { Audiowide, League_Gothic, Montserrat } from "next/font/google";
import GalaxyExperience from "@/components/galaxy/GalaxyExperience";
import "./galaxy.css";

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400",
});

const leagueGothic = League_Gothic({
  variable: "--font-league-gothic",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Galaxy",
};

export default function GalaxyPage() {
  return (
    <div className={`${audiowide.variable} ${leagueGothic.variable} ${montserrat.variable}`}>
      <GalaxyExperience />
    </div>
  );
}
