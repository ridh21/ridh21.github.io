import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import {
  getProjectsCollection,
  serializeDocs,
  type ProjectDoc,
} from "app/lib/collections";

export async function GET() {
  try {
    const col = await getProjectsCollection();
    const docs = await col.find({}).sort({ order: 1 }).toArray();
    return NextResponse.json(serializeDocs(docs));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const col = await getProjectsCollection();

    const count = await col.countDocuments();
    const doc: ProjectDoc = {
      title: body.title || "",
      year: body.year || new Date().getFullYear(),
      description: body.description || "",
      details: body.details || "",
      url: body.url || "",
      image: body.image || "",
      tags: body.tags || [],
      order: body.order ?? count,
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
