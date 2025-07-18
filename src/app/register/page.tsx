"use client";

import { AuthCredential } from "@/types/auth";
import Link from "next/link";
import { FormEventHandler, useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState<AuthCredential>({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (key: keyof AuthCredential, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "post",
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      const errorData = await res.json();
      setIsLoading(false);
      setErrorMessage(errorData.message || "Failed to register");
      return;
    }
    setIsLoading(false);
    setIsSuccess(true);
  };

  return (
    <div className="flex items-center justify-center h-screen p-5">
      <div className="shadow-2xl flex flex-col rounded-2xl p-5 gap-5 w-1/2 bg-white max-md:w-full">
        <h1 className="text-center text-2xl font-bold">Create a New Account</h1>
        {errorMessage && (
          <p className="text-center bg-red-50 p-2 rounded-md border border-red-400 text-red-400">
            {errorMessage}
          </p>
        )}
        {isSuccess && (
          <p className="text-center bg-green-50 p-2 rounded-md border border-green-400 text-green-400">
            User Registered Successfully, Now try to login
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-bold">
              Username
            </label>
            <input
              type="text"
              onChange={(e) => handleInputChange("username", e.target.value)}
              value={formData.username}
              disabled={isLoading || isSuccess}
              required
              placeholder="enter your username"
              id="username"
              className="bg-gray-100 py-2 px-2 rounded-md disabled:opacity-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => handleInputChange("password", e.target.value)}
              value={formData.password}
              disabled={isLoading || isSuccess}
              required
              minLength={6}
              placeholder="enter your password"
              id="password"
              className="bg-gray-100 py-2 px-2 rounded-md disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="w-full cursor-pointer bg-blue-400 py-2 px-4 rounded-md font-bold text-white disabled:opacity-50 disabled:cursor-auto"
          >
            {isLoading ? "...Loading" : "Register"}
          </button>
        </form>
        <span className="text-center">already have an account ?</span>
        <Link
          href="/login"
          type="submit"
          className="w-full text-center cursor-pointer bg-slate-400 py-2 px-4 rounded-md text-white font-bold"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
