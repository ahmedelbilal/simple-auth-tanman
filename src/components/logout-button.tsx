"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="py-2 px-4 bg-red-300 rounded-md cursor-pointer"
    >
      Logout
    </button>
  );
}
