import { Feed } from "feed";
import { getPostsCollection } from "app/lib/collections";
import { metaData } from "app/config";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ format: string }> }
) {
  const { format } = await params;
  const validFormats = ["rss.xml", "atom.xml", "feed.json"];

  if (!validFormats.includes(format)) {
    return NextResponse.json(
      { error: "Unsupported feed format" },
      { status: 404 }
    );
  }

  const BaseUrl = metaData.baseUrl.endsWith("/")
    ? metaData.baseUrl
    : `${metaData.baseUrl}/`;

  const feed = new Feed({
    title: metaData.title,
    description: metaData.description,
    id: BaseUrl,
    link: BaseUrl,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${
      metaData.title
    }`,
    generator: "Feed for Node.js",
    feedLinks: {
      json: `${BaseUrl}feed.json`,
      atom: `${BaseUrl}atom.xml`,
      rss: `${BaseUrl}rss.xml`,
    },
  });

  const col = await getPostsCollection();
  const allPosts = await col.find({ published: true }).sort({ publishedAt: -1 }).toArray();

  allPosts.forEach((post) => {
    const postUrl = `${BaseUrl}blog/${post.slug}`;
    const categories = Array.isArray(post.tags)
      ? post.tags
      : [];

    // Validate and parse the date
    let publishedDate: Date;
    try {
      // Attempt to create a Date object from publishedAt
      const parsedDate = new Date(post.publishedAt);
      if (isNaN(parsedDate.getTime())) {
        console.warn(`Invalid date for post "${post.title}" (${post.slug}). Using current date.`);
        publishedDate = new Date();
      } else {
        publishedDate = parsedDate;
      }
    } catch (e) {
      console.error(`Error parsing date for post "${post.title}" (${post.slug}):`, e);
      publishedDate = new Date();
    }

    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.summary,
      category: categories.map((tag) => ({
        name: tag,
        term: tag,
      })),
      date: publishedDate, // Use the validated date
    });
  });

  const responseMap: Record<string, { content: string; contentType: string }> =
    {
      "rss.xml": { content: feed.rss2(), contentType: "application/xml" },
      "atom.xml": { content: feed.atom1(), contentType: "application/xml" },
      "feed.json": { content: feed.json1(), contentType: "application/json" },
    };

  const response = responseMap[format];

  return new NextResponse(response.content, {
    headers: {
      "Content-Type": response.contentType,
    },
  });
}
