import { NextResponse } from "next/server";
import {
  getPhotoSectionsCollection,
  serializeDocs,
  type PhotoSectionDoc,
} from "app/lib/collections";

export async function GET() {
  try {
    const col = await getPhotoSectionsCollection();
    const docs = await col.find({}).sort({ order: 1 }).toArray();
    return NextResponse.json(serializeDocs(docs));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const col = await getPhotoSectionsCollection();

    const count = await col.countDocuments();
    const doc: PhotoSectionDoc = {
      title: body.title || "",
      subtitle: body.subtitle || "",
      images: body.images || [],
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
