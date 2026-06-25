"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import {
  Star,  Copy,
  Lock,LockOpen,  Crown,
} from "lucide-react";

export default function PromptCard({ item }) {
  const router = useRouter();

  const { user } = useAuth();

  const [showUpgrade, setShowUpgrade] = useState(false);

  if (!item) {
    return null;
  }

  const isPremium =
    user?.subscription?.status === "active";

  const locked =
    item?.visibility === "Private" &&
    !isPremium;

  const handleView = () => {
    if (!user) {
      toast.error("Please login first");

      router.push("/register");

      return;
    }

    if (locked) {
      setShowUpgrade(true);

      return;
    }

    router.push(`/prompts/${item._id}`);
  };

  return (
    <>
      <div className="group rounded-[32px] border overflow-hidden bg-card hover:-translate-y-2 transition">
        <div className="relative">
          <img
            src={
              item?.thumbnail ||
              "https://placehold.co/800x500"
            }
            alt={item?.title}
            className="h-[260px] w-full object-cover"
          />

          <div className="absolute top-4 left-4">
            {locked ? (
              <div className="flex gap-2 rounded-full bg-black/80 px-4 py-2 text-white">
                <Lock size={16} />

                Premium
              </div>
            ) : (
              <div className="flex gap-2 rounded-full bg-emerald-500 px-4 py-2 text-white">
                <LockOpen size={16} />

                Unlocked
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between">
            <span className="text-sm opacity-60">
              {item?.tool}
            </span>

            <span className="flex gap-1 items-center">
              <Star size={18} />

              {item?.rating || 0}
            </span>
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

                {item?.copyCount || 0}
              </div>

              <div className="flex items-center gap-2">
                <Star size={18} />

                {item?.reviewCount || 0}
              </div>
            </div>

            <button
              onClick={handleView}
              className={`rounded-xl px-6 py-2 text-white transition ${
                locked
                  ? "bg-yellow-600"
                  : "bg-violet-600"
              }`}
            >
              {locked ? "Unlock" : "View"}
            </button>
          </div>
        </div>
      </div>

      {showUpgrade && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-[40px] p-10 max-w-md text-center">
            <Crown
              size={60}
              className="mx-auto text-yellow-500"
            />

            <h2 className="text-4xl font-black mt-5">
              Premium Prompt
            </h2>

            <p className="mt-5 text-gray-500">
              Upgrade to Growth or Premium
              to unlock this prompt.
            </p>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() =>
                  setShowUpgrade(false)
                }
                className="flex-1 border rounded-xl py-4"
              >
                Close
              </button>

              <button
                onClick={() =>
                  router.push("/pricing")
                }
                className="flex-1 bg-black text-white rounded-xl py-4"
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}