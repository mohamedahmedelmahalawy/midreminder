"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import Button from "@/app/components/button";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log("Login form submitted:", data);
  };

  return (
    <div className="min-h-screen flex">
      {}
      <div className="w-1/2 bg-purple-700 text-white flex flex-col justify-center items-center p-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Log in and manage your projects easily with Untitled.
        </h2>
        <div className="mt-4 flex flex-col items-center">
          <img
            src=""
            alt="Alex Johnson"
            className="rounded-full w-16 h-16 mb-2"
          />
          <p className="font-medium">Alex Johnson</p>
          <p className="text-sm">Project Manager, Layers</p>
          <div className="flex mt-1 text-yellow-400">★★★★★</div>
        </div>
      </div>

      {}
      <div className="w-1/2 p-10 flex flex-col justify-center">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-gray-500 mb-6">Please enter your credentials to log in.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="email" {...register("email")} placeholder="Enter your email" className="w-full border rounded p-2" />
          <input type="password" {...register("password")} placeholder="Password" className="w-full border rounded p-2" />
          <button type="submit" className="w-full bg-purple-600 text-white rounded p-2 hover:bg-purple-700">
            Login
          </button>
        </form>
        <p className="text-sm mt-4 text-gray-500">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-purple-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
