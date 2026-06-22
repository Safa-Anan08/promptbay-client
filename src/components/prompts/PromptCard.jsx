"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Star, Copy, Lock } from "lucide-react";

export default function PromptCard({ item }) {
  const router = useRouter();
  const { user } = useAuth();

  if (!item) {
    return null;
  }

  const handleView = () => {
    if (!user) {
      toast.error("Please login first");
      router.push("/register");
      return;
    }

    router.push(`/prompts/${item._id}`);
  };

  return (
    <div className="group rounded-[32px] border overflow-hidden bg-card hover:-translate-y-2 transition">
      <div className="relative">
        <img
          src={item?.thumbnail || "https://placehold.co/800x500"}
          alt={item?.title || "Prompt Thumbnail"}
          className="h-[260px] w-full object-cover"
        />

        {item?.isPremium && (
          <div className="absolute top-4 left-4 flex gap-2 rounded-full bg-black/70 px-4 py-2 text-white">
            <Lock size={16} />
            <span>Premium</span>
          </div>
        )} 
      </div>

      <div className="p-6">
        <div className="flex justify-between">
          <span className="text-sm opacity-60">{item?.tool || "N/A"}</span>
          <span className="flex gap-1 justify-center items-center"><Star size={18} />{item?.rating || 0}</span>
        </div>

        <h2 className="mt-4 text-3xl font-bold">
          {item?.title}
        </h2>

        <p className="mt-3 line-clamp-2 opacity-70">
          {item?.description}
        </p>

        <div className="mt-8 flex justify-between">
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <Copy size={18} />
              <span>{item?.copyCount || 0}</span>
            </div>

            <div className="flex items-center gap-2">
              <Star size={18} />
              <span>{item?.reviewCount || 0}</span>
            </div>
          </div>

          <button
            onClick={handleView}
            className="rounded-xl bg-violet-600 px-6 py-2 text-white"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}