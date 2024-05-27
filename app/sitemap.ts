import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://shubhdeep12.github.io/eslint-config-generator/`,
      lastModified: new Date().toISOString().split("T")[0],
    },
  ];
}
