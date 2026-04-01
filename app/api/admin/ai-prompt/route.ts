import { NextResponse } from "next/server";
import { getSystemPromptsCollection } from "app/lib/collections";

export async function GET() {
  try {
    const col = await getSystemPromptsCollection();
    const doc = await col.findOne({ prompt_type: "Ridham_AI_Persona" });
    if (!doc) {
      return NextResponse.json({ prompt_type: "Ridham_AI_Persona", content: "" });
    }
    return NextResponse.json({
      _id: doc._id.toString(),
      prompt_type: doc.prompt_type,
      content: doc.content,
      updatedAt: doc.updatedAt,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { content } = body;

    if (typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt content is required" },
        { status: 400 }
      );
    }

    const col = await getSystemPromptsCollection();
    await col.updateOne(
      { prompt_type: "Ridham_AI_Persona" },
      {
        $set: { content, updatedAt: new Date() },
        $setOnInsert: { prompt_type: "Ridham_AI_Persona", createdAt: new Date() },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
