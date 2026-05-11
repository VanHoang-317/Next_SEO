import { siteUrl } from "@/lib/site";
import { MetadataRoute } from "next";

const baseUrl = siteUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/admin"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
