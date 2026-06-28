"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles,Rocket, Crown, TrendingUp,Eye, EyeOff, Mail, Lock, User, Image } from "lucide-react";
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[90vh]">
<div className="hidden lg:flex flex-col justify-center gap-20 rounded-[32px] xl:rounded-[40px] p-8 xl:p-10 text-white bg-gradient-to-br from-indigo-900 via-teal-900 to-teal-600 relative overflow-hidden min-h-[720px]">

  <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-cyan-400/30 blur-3xl" />

  <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-fuchsia-500/20 blur-3xl" />

  <div className="relative z-10">
    <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
      Build • Share • Sell
      <br />
      AI Prompts
    </h2>

    <p className="mt-5 text-base xl:text-lg text-white/80">
      Discover premium AI prompts and grow as creator.
    </p>
  </div>

  <div className="relative z-10 rounded-3xl bg-white/10 p-7 backdrop-blur-xl max-w-md">

    <ul className="space-y-5">

      <li className="flex items-center gap-4">
        <div className="rounded-2xl bg-white/10 p-3">
          <Sparkles size={20} />
        </div>

        <span>Discover Prompts</span>
      </li>

      <li className="flex items-center gap-4">
        <div className="rounded-2xl bg-white/10 p-3">
          <Rocket size={20} />
        </div>

        <span>Become Creator</span>
      </li>

      <li className="flex items-center gap-4">
        <div className="rounded-2xl bg-white/10 p-3">
          <Crown size={20} />
        </div>

        <span>Premium Access</span>
      </li>

      <li className="flex items-center gap-4">
        <div className="rounded-2xl bg-white/10 p-3">
          <TrendingUp size={20} />
        </div>

        <span>Build Audience</span>
      </li>
    </ul>
  </div>
</div>

          <div className="w-full max-w-xl mx-auto border rounded-[28px] sm:rounded-[36px] p-5 sm:p-8 shadow-2xl">
           <h1 className="text-3xl sm:text-4xl font-bold">
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
                className={`h-11 sm:h-12 rounded-xl text-sm sm:text-base ${
                  role === "user"
                    ? "bg-teal-600 text-white"
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
                    ? "bg-teal-600 text-white"
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
                <User className="absolute left-3 sm:left-4 top-3.5 sm:top-4 w-5 h-5"/>

                <input
                  name="name"
                  placeholder="Full Name"
                  className="w-full h-11 sm:h-12 border rounded-xl pl-11 sm:pl-12 text-sm sm:text-base"
                />
              </div>

              <div className="relative">
                <Image className="absolute left-3 sm:left-4 top-3.5 sm:top-4 w-5 h-5"/>

                <input
                  name="imgUrl"
                  placeholder="Photo URL"
                  className="w-full h-11 sm:h-12 border rounded-xl pl-11 sm:pl-12 text-sm sm:text-base"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-3.5 sm:top-4 w-5 h-5"/>

                <input
                  name="email"
                  placeholder="Email"
                  className="w-full h-11 sm:h-12 border rounded-xl pl-11 sm:pl-12 text-sm sm:text-base"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-3.5 sm:top-4 w-5 h-5"/>

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full h-11 sm:h-12 border rounded-xl pl-11 sm:pl-12 pr-11 sm:pr-12 text-sm sm:text-base"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 sm:right-4 top-3"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <button className="w-full h-11 sm:h-12 rounded-xl bg-gradient-to-r from-teal-600 to-teal-600 text-white font-semibold transition hover:opacity-90">
                Create Account
              </button>
            </form>

            <p className="mt-6 text-center text-sm sm:text-base">
              Already have account?

              <Link
                href="/login"
                className="ml-2 text-cyan-700 font-bold"
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