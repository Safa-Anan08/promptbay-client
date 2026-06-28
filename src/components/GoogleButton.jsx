"use client";

import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoogleButton() {
  const router = useRouter();
  const { fetchUser } = useAuth();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoogle = useCallback(
    async (res) => {
      try {
        await axiosInstance.post(
          "/auth/google",
          {
            credential: res.credential,
          },
          {
            withCredentials: true,
          }
        );

        await fetchUser();

        router.push("/");
      } catch (err) {
        console.log(err);

        toast.error("Google login failed");
      }
    },
    [fetchUser, router]
  );

  if (!mounted) return null;

  return (
    <div className="w-full flex justify-center mt-3">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.15)] px-5 py-5 w-full max-w-md">

        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-yellow-400" />

          <span className="text-sm text-white/80">
            Continue instantly as a user
          </span> 
          
          
        </div>

        <GoogleLogin
          theme="filled_black"
          size="large"
          shape="pill"
          text="continue_with"
          width="w-full"
          onSuccess={handleGoogle}
          onError={() =>
            toast.error("Google login failed")
          }
        />

      </div>
    </div>
  );
}