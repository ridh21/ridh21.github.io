import { NextResponse } from "next/server";
import {
  getExperienceCollection,
  serializeDocs,
  type ExperienceDoc,
} from "app/lib/collections";

export async function GET() {
  try {
    const col = await getExperienceCollection();
    const docs = await col.find({}).sort({ order: 1 }).toArray();
    return NextResponse.json(serializeDocs(docs));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const col = await getExperienceCollection();

    const count = await col.countDocuments();
    const doc: ExperienceDoc = {
      role: body.role || "",
      company: body.company || "",
      location: body.location || "",
      period: body.period || "",
      description: body.description || "",
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
