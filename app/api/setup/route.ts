import { NextResponse } from "next/server";
import { getAdminUsersCollection } from "app/lib/collections";
import { hashPassword } from "app/lib/admin-auth";

/**
 * One-time setup endpoint: creates the admin user.
 * Only works when no admin users exist in the database.
 */
export async function POST() {
  try {
    const col = await getAdminUsersCollection();
    const count = await col.countDocuments();

    if (count > 0) {
      return NextResponse.json(
        { error: "Admin user already exists. Setup is disabled." },
        { status: 403 }
      );
    }

    await col.insertOne({
      email: "ridhampatel.dev@gmail.com",
      passwordHash: hashPassword("whocares@2004"),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Admin user created" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const col = await getAdminUsersCollection();
    const count = await col.countDocuments();
    return NextResponse.json({ adminExists: count > 0 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
