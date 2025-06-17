import { NextResponse } from "next/server";
import { is_PRODUCTION } from "../../config";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: is_PRODUCTION,
    path: "/",
    maxAge: 0,
  });

  return response;
}
