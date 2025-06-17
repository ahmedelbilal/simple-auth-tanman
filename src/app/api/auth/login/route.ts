import { users } from "@/db/schema";
import { db } from "@/lib/db";
import { secret } from "@/lib/jose";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  if (!username || !password) {
    return Response.json(
      { message: "Username and password are required" },
      { status: 400 }
    );
  }

  const [user] = await db
    .select({
      id: users.id,
      username: users.username,
      password: users.password,
    })
    .from(users)
    .where(eq(users.username, username));

  if (!user) {
    return Response.json(
      { message: "Username or password is not correct, try again" },
      { status: 400 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return Response.json(
      { message: "Username or password is not correct, try again" },
      { status: 400 }
    );
  }

  const token = await new SignJWT({ id: user.id, username: user.username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);

  const editableCookies = await cookies();
  editableCookies.set("token", token, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    path: "/",
    maxAge: 60 * 60,
  });

  return Response.json(
    {
      message: "Logged in successfully",
      user: { id: user.id, username: user.username },
    },
    { status: 201 }
  );
}
