import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { getAdminUsersCollection } from "./collections";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "admin-secret-change-in-production-2024"
);

const COOKIE_NAME = "admin_token";
const TOKEN_EXPIRY = "7d";

/**
 * Verify admin credentials against the database.
 * Returns true if email and password match a record.
 */
export async function verifyCredentials(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const col = await getAdminUsersCollection();
    const user = await col.findOne({ email: email.toLowerCase().trim() });
    if (!user) return false;
    return bcrypt.compareSync(password, user.passwordHash);
  } catch (e) {
    console.error("Auth verification error:", e);
    return false;
  }
}

/**
 * Hash a plain-text password.
 */
export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

/**
 * Create a signed JWT token for the admin session.
 */
export async function createToken(email: string): Promise<string> {
  return new SignJWT({ role: "admin", email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

/**
 * Verify a JWT token. Returns true if valid.
 */
export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if the current request is authenticated (for Server Components & API routes).
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifyToken(token);
  } catch {
    return false;
  }
}

/**
 * Get the cookie name for the admin token.
 */
export function getAdminCookieName(): string {
  return COOKIE_NAME;
}
