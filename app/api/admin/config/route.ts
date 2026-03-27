import { NextResponse } from "next/server";
import {
  getSiteConfigCollection,
  serializeDoc,
  type SiteConfigDoc,
} from "app/lib/collections";
import {
  DEFAULT_PRIMARY_COLOR_KEY,
  isPrimaryColorKey,
} from "app/lib/primary-colors";

export async function GET() {
  try {
    const col = await getSiteConfigCollection();
    const doc = await col.findOne({ key: "main" });
    if (!doc) {
      // Return default config if none exists
      return NextResponse.json({
        _id: "",
        key: "main",
        name: "Ridham Patel",
        title: "Ridham Patel",
        description: "",
        bio: "",
        subtitle: "Software Developer · Researcher · AI/ML Engineer",
        primaryColor: DEFAULT_PRIMARY_COLOR_KEY,
        socialLinks: {
          twitter: "",
          github: "",
          instagram: "",
          linkedin: "",
          email: "",
          orcid: "",
          scholar: "",
        },
        updatedAt: new Date(),
      });
    }
    return NextResponse.json(serializeDoc(doc));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const col = await getSiteConfigCollection();

    const primaryColor = isPrimaryColorKey(body.primaryColor)
      ? body.primaryColor
      : DEFAULT_PRIMARY_COLOR_KEY;

    const update: Partial<SiteConfigDoc> = {
      name: body.name,
      title: body.title,
      description: body.description,
      bio: body.bio,
      subtitle: body.subtitle,
      primaryColor,
      socialLinks: body.socialLinks,
      updatedAt: new Date(),
    };

    await col.updateOne(
      { key: "main" },
      { $set: update },
      { upsert: true }
    );

    const doc = await col.findOne({ key: "main" });
    return NextResponse.json(serializeDoc(doc!));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
