import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://portfolio-eight-cyan-bcmtc3awoy.vercel.app/sitemap.xml",
  };
}
