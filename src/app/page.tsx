import LogoutButton from "@/components/logout-button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const URL = process.env.URL;

export default async function Home() {
  const cookieHeader = cookies().toString();

  const res = await fetch(`${URL}/api/auth/me`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    redirect("/login");
  }

  const user = await res.json();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center">
        Welcome {user.username}
      </h1>
      <LogoutButton />
    </div>
  );
}
