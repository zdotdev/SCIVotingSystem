import { JWT_SECRET } from "$env/static/private";
import { error } from "@sveltejs/kit";
import type { JWT_Payload } from "$interface/jwt_payload";
import * as jose from "jose";

export const create_auth_jwt = async (data: JWT_Payload) => {
  const jwt = await new jose.SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(JWT_SECRET));
  return jwt;
};

export const verify_auth_jwt = async (token: string) => {
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    if (!payload.email || !payload.id) {
      throw error(401, "invalid JWT payload structure");
    }
    return payload as unknown as JWT_Payload;
  } catch {
    throw error(401, "invalid or missing JWT, you are not logged in");
  }
};
