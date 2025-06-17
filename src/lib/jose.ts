import { jwtVerify } from "jose";

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    return payload; // contains id and username
  } catch (err) {
    return null;
  }
}

export const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
