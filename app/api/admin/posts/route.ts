import { NextResponse } from "next/server";
import {
  getPostsCollection,
  serializeDocs,
  type PostDoc,
} from "app/lib/collections";

export async function GET() {
  try {
    const col = await getPostsCollection();
    const docs = await col
      .find({})
      .sort({ publishedAt: -1 })
      .toArray();
    return NextResponse.json(serializeDocs(docs));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const col = await getPostsCollection();

    // Check for duplicate slug
    const existing = await col.findOne({ slug: body.slug });
    if (existing)
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 }
      );

    const doc: PostDoc = {
      slug: body.slug || "",
      title: body.title || "",
      publishedAt: body.publishedAt || new Date().toISOString().slice(0, 10),
      summary: body.summary || "",
      tags: body.tags || [],
      image: body.image || undefined,
      content: body.content || "",
      published: body.published ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await col.insertOne(doc);
    return NextResponse.json(
      { _id: result.insertedId.toString(), ...doc },
      { status: 201 }
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
