"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Image } from "lucide-react";
import GoogleButton from "@/components/GoogleButton";

export default function RegisterForm() {
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const userData = {
      name: form.get("name"),
      email: form.get("email"),
      imgUrl: form.get("imgUrl"),
      password: form.get("password"),
      role,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        userData
      );

      if (res.data.success) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[90vh]">
          <div className="hidden lg:flex flex-col justify-between rounded-3xl p-10 text-white bg-gradient-to-br from-violet-700 via-indigo-700 to-sky-600 relative overflow-hidden">
            <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-cyan-400/30 blur-3xl" />

            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-fuchsia-500/20 blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-5xl font-bold">
                Build • Share • Sell
                <br />
                AI Prompts
              </h2>

              <p className="mt-6 text-white/80">
                Discover premium AI prompts and grow as creator.
              </p>
            </div>

            <div className="relative z-10 bg-white/10 rounded-2xl p-6 backdrop-blur">
              <ul className="space-y-3">
                <li>✨ Discover Prompts</li>
                <li>🚀 Become Creator</li>
                <li>💎 Premium Access</li>
                <li>📈 Build Audience</li>
              </ul>
            </div>
          </div>

          <div className="w-full max-w-xl mx-auto border rounded-3xl p-8 shadow-2xl">
            <h1 className="text-4xl font-bold">
              Create Account
            </h1>

            <p className="mt-2 text-muted-foreground">
              Join PromptBay
            </p>

            <GoogleButton />

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-border" />

              <span className="px-4">
                OR
              </span>

              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`h-12 rounded-xl ${
                  role === "user"
                    ? "bg-violet-600 text-white"
                    : "border"
                }`}
              >
                User
              </button>

              <button
                type="button"
                onClick={() => setRole("creator")}
                className={`h-12 rounded-xl ${
                  role === "creator"
                    ? "bg-violet-600 text-white"
                    : "border"
                }`}
              >
                Creator
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="relative">
                <User className="absolute left-4 top-4 w-5" />

                <input
                  name="name"
                  placeholder="Full Name"
                  className="w-full h-12 border rounded-xl pl-12"
                />
              </div>

              <div className="relative">
                <Image className="absolute left-4 top-4 w-5" />

                <input
                  name="imgUrl"
                  placeholder="Photo URL"
                  className="w-full h-12 border rounded-xl pl-12"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-4 w-5" />

                <input
                  name="email"
                  placeholder="Email"
                  className="w-full h-12 border rounded-xl pl-12"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-4 w-5" />

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full h-12 border rounded-xl pl-12 pr-12"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-3"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <button className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                Create Account
              </button>
            </form>

            <p className="text-center mt-6">
              Already have account?

              <Link
                href="/login"
                className="ml-2 text-violet-600"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}