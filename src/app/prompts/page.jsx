"use client";

import { Suspense, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

function PromptsContent() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);

  const { user } = useAuth();

  const router = useRouter();

  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";

  const visiblePrompts = user ? data : data.slice(0, 6);

  const load = async () => {
    try {
      const res = await axiosInstance.get("/prompts", {
        params: {
          search,
          category,
        },
      });

      setData(res.data.prompts || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, [category]);

  const canAccessPremium = () => {
    const plan = user?.subscription?.plan?.toLowerCase();

    return ["pro", "growth", "premium"].includes(plan);
  };

  const handleView = (item) => {
    if (!user) {
      toast.error("Please login first");
      router.push("/register");
      return;
    }

    const locked =
      item.visibility?.toLowerCase() === "private" &&
      !canAccessPremium();

    if (locked) {
      setShowUpgrade(true);
      return;
    }

    router.push(`/prompts/${item._id}`);
  };

  return (
    <>
    <section className="max-w-7xl mx-auto px-6 pt-10 pb-24">
      <div className="text-center mb-14">
        <div className="inline-flex gap-2 items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-emerald-500">
          <Sparkles size={16} />
          Premium Collection
        </div>

        <h1 className="mt-6 text-5xl lg:text-7xl font-black">
          Explore AI Prompts
        </h1>

        <p className="mt-5 text-muted-foreground">
          Browse premium prompts from creators
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-16">
        <div className="rounded-3xl border p-3 flex gap-3">
          <div className="flex items-center flex-1 px-4">
            <Search size={20} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prompts..."
              className="w-full bg-transparent outline-none px-3 py-3"
            />
          </div>

          <button
            onClick={load}
            className="px-8 py-4 rounded-2xl bg-black text-white"
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {visiblePrompts.map((item) => {
          const locked =
            item.visibility?.toLowerCase() === "private" &&
            !canAccessPremium();

          return (
            <div
              key={item._id}
              className="group rounded-[32px] border overflow-hidden bg-card hover:-translate-y-2 transition"
            >
              <div className="relative">
                <img
                  src={
                    item.thumbnail ||
                    "https://placehold.co/800x500"
                  }
                  alt=""
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
                    {item.tool}
                  </span>

                  <span className="flex gap-1 items-center">
                    <Star size={18} />
                    {item.rating || 0}
                  </span>
                </div>

                <h2 className="mt-4 text-3xl font-bold">
                  {item.title}
                </h2>

                <p className="mt-3 line-clamp-2 opacity-70">
                  {item.description}
                </p>

                <div className="mt-8 flex justify-between">
                  <div className="flex gap-5">
                    <div className="flex gap-2 items-center">
                      <Copy size={18} />
                      {item.copyCount || 0}
                    </div>
                  </div>

                  <button
                    onClick={() => handleView(item)}
                    className={`rounded-xl px-6 py-2 text-white transition ${
                      locked ? "bg-yellow-600" : "bg-violet-600"
                    }`}
                  >
                    {locked ? "Unlock" : "View"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showUpgrade && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-[40px] p-10 w-[500px] text-center">
            <Crown
              size={70}
              className="mx-auto text-yellow-500"
            />

            <h2 className="text-4xl font-black mt-6">
              Premium Required
            </h2>

            <p className="mt-5 text-gray-500">
              Upgrade to Growth / Premium to unlock private prompts
            </p>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setShowUpgrade(false)}
                className="flex-1 border py-4 rounded-xl"
              >
                Close
              </button>

              <button
                onClick={() => router.push("/pricing")}
                className="flex-1 bg-black text-white rounded-xl py-4"
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
    </>
  );
}
export default function Page() {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <PromptsContent />
    </Suspense>
  );
}