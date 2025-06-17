import { users } from "@/db/schema";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  if (!username || !password) {
    return Response.json(
      { message: "Username and password are required" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return Response.json(
      { message: "Min password length is 6" },
      { status: 400 }
    );
  }

  const [user] = await db
    .select({})
    .from(users)
    .where(eq(users.username, username));

  if (user) {
    return Response.json(
      { message: "Username already exits, try another one." },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [newUser] = await db
    .insert(users)
    .values({ username: username, password: hashedPassword })
    .returning({ id: users.id, username: users.username });

  return Response.json(
    { message: "User registered successfully", user: newUser },
    { status: 201 }
  );
}
