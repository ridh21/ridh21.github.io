import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = "https://ridhfolio.vercel.app";

  const config = {
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}/api/admin/auth/login`,
    token_endpoint: `${baseUrl}/api/admin/auth/login`,
    jwks_uri: `${baseUrl}/.well-known/jwks.json`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "password"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    scopes_supported: ["openid", "profile", "email"],
    token_endpoint_auth_methods_supported: ["client_secret_post"],
  };

  return NextResponse.json(config, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
