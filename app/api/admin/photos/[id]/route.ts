import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getPhotoSectionsCollection, serializeDoc } from "app/lib/collections";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const col = await getPhotoSectionsCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    if (!doc)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(serializeDoc(doc));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const col = await getPhotoSectionsCollection();

    const { _id, createdAt, ...update } = body;
    update.updatedAt = new Date();

    await col.updateOne({ _id: new ObjectId(id) }, { $set: update });
    const doc = await col.findOne({ _id: new ObjectId(id) });
    if (!doc)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(serializeDoc(doc));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const col = await getPhotoSectionsCollection();
    await col.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
