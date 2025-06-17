import { verifyJWT } from "@/lib/jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const editableCookies = await cookies();
  const token = editableCookies.get("token")?.value;

  if (!token) {
    return Response.json({ message: "User is not logged in" }, { status: 401 });
  }

  const payload = await verifyJWT(token);

  if (!payload) {
    return Response.json({ message: "Token is expired" }, { status: 401 });
  }

  return Response.json(
    {
      id: payload.id,
      username: payload.username,
    },
    { status: 200 }
  );
}
