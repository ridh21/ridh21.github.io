import { MetadataRoute } from "next";
import { getPostsCollection } from "./lib/collections";
import { metaData } from "./config";

export const dynamic = "force-dynamic";

const BaseUrl = metaData.baseUrl.endsWith("/")
  ? metaData.baseUrl
  : `${metaData.baseUrl}/`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const col = await getPostsCollection();
  const posts = await col.find({ published: true }).toArray();
  let blogs = posts.map((post) => ({
    url: `${BaseUrl}blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  let routes = ["", "blog", "projects", "ai"].map((route) => ({ // Replaced 'education' and 'photos' with 'cv'
    url: `${BaseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}