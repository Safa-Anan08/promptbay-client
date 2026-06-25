"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import GoogleButton from "@/components/GoogleButton";

export default function LoginPage() {
  const router = useRouter();

  const { fetchUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const userData = {
      email: form.get("email"),
      password: form.get("password"),
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        userData,
        {
          withCredentials: true,
        }
      );

      await fetchUser();

      const role = res.data.role;

      if (role === "user") {
        window.location.href = "/dashboard/user";
      } else if (role === "creator") {
        window.location.href = "/dashboard/creator";
      } else if (role === "admin") {
        window.location.href = "/dashboard/admin";
      }
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border rounded-xl p-6">
      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
        />

        <button className="w-full bg-black text-white p-3 rounded">
          Login
        </button>
      </form>

      <GoogleButton />
    </div>
  );
}