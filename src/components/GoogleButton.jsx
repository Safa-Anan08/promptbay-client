"use client";

import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useCallback } from "react";
import { Sparkles } from "lucide-react";

export default function GoogleButton() {
  const { fetchUser } = useAuth();

  const handleGoogle = useCallback(async (res) => {
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

      toast.success("Logged in");

      window.location.href = "/";
    } catch (err) {
      console.log(err);

      toast.error("Google login failed");
    }
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div
        className=" relative overflow-hidden rounded-3xl border border-white/10  bg-gradient-to-br from-white/10 via-white/5 to-transparent  backdrop-blur-xl  shadow-[0_0_40px_rgba(59,130,246,0.15)]  px-5 py-5  w-full max-w-md transition-all duration-300 hover:scale-[1.02]
        hover:shadow-[0_0_60px_rgba(59,130,246,0.25)] " >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-white/80">
            Continue instantly
          </span>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            theme="filled_blue"
            size="large"
            shape="pill"
            text="continue_with"
            width="340"
            onSuccess={handleGoogle}
            onError={() => toast.error("Google login failed")}
          />
        </div>

        <p className="text-center text-xs text-white/40 mt-4">
          Secure login powered by Google
        </p>
      </div>
    </div>
  );
}