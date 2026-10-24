import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { personal } from "@/app/data/resume";

export const alt = `${personal.name} — Full-Stack Developer · Payments, SaaS and AI`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GIANT = "KISHORE";
const TAGS = ["Full-Stack", "Payments", "SaaS", "AI & RAG"];
const AVAILABLE = "Available for full-time & freelance";
const PLACE = `${personal.location} · Remote`;

async function googleFont(family: string, weight: number, text: string) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!match) return null;
    const response = await fetch(match[1]);
    return response.ok ? await response.arrayBuffer() : null;
  } catch {
    return null;
  }
}

async function cutout() {
  const png = await readFile(join(process.cwd(), "public", "story", "characters", "kishore-blazer-cutout-og.png"));
  return { src: `data:image/png;base64,${png.toString("base64")}`, width: png.readUInt32BE(16), height: png.readUInt32BE(20) };
}

export default async function OpengraphImage() {
  const sansText = `${personal.name}Full-Stack Developer${TAGS.join("")}${AVAILABLE}${PLACE}KK.·`;
  const [anton, jakarta, person] = await Promise.all([
    googleFont("Anton", 400, GIANT),
    googleFont("Plus+Jakarta+Sans", 800, sansText),
    cutout(),
  ]);

  const fonts = [
    ...(anton ? [{ name: "Anton", data: anton, weight: 400 as const, style: "normal" as const }] : []),
    ...(jakarta ? [{ name: "Jakarta", data: jakarta, weight: 800 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "linear-gradient(140deg, #ff9a3d 0%, #ff6a1f 45%, #ec4a0e 100%)",
          fontFamily: "Jakarta",
          color: "#16120e",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 70,
            display: "flex",
            justifyContent: "center",
            fontFamily: "Anton",
            fontSize: 330,
            lineHeight: 1,
            color: "rgba(255, 249, 240, 0.92)",
          }}
        >
          {GIANT}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img elements */}
        <img
          src={person.src}
          width={person.width}
          height={person.height}
          alt=""
          style={{ position: "absolute", left: 760 - person.width / 2, bottom: -10 }}
        />
        <div style={{ position: "absolute", left: 48, top: 36, display: "flex", fontSize: 30, fontWeight: 800 }}>
          KK<span style={{ color: "#fff9f0" }}>.</span>
        </div>
        <div
          style={{
            position: "absolute",
            right: 40,
            top: 40,
            display: "flex",
            flexDirection: "column",
            padding: "16px 20px",
            borderRadius: 18,
            background: "rgba(255, 249, 240, 0.82)",
            fontSize: 18,
            fontWeight: 800,
            boxShadow: "0 20px 40px -20px rgba(40, 12, 0, 0.45)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 10, height: 10, marginRight: 10, borderRadius: 999, background: "#1fb15a" }} />
            {AVAILABLE}
          </div>
          <div style={{ marginTop: 4, fontSize: 15, opacity: 0.7 }}>{PLACE}</div>
        </div>
        <div style={{ position: "absolute", left: 48, bottom: 40, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1 }}>{personal.name}</div>
          <div style={{ marginTop: 10, fontSize: 24, fontWeight: 800 }}>Full-Stack Developer</div>
          <div style={{ display: "flex", marginTop: 18 }}>
            {TAGS.map((tag) => (
              <div
                key={tag}
                style={{
                  marginRight: 10,
                  padding: "8px 16px",
                  border: "2px solid #16120e",
                  borderRadius: 999,
                  background: "rgba(255, 255, 255, 0.2)",
                  fontSize: 17,
                  fontWeight: 800,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
