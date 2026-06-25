"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import {
  Copy,
  Bookmark,
  TrendingUp,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import LoadingModal from "@/components/LoadingModal";

export default function UserDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await axiosInstance.get("/user-dashboard");

      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (data === null) {
    return (
      <LoadingModal
        title="Checking Access..."
        description="Verifying your account and permissions."
      />
    );
  }

  const stats = [
    {
      title: "Copied",
      value: data.totalCopies,
      icon: Copy,
      grad: "from-cyan-500 to-blue-500",
    },
    {
      title: "Bookmarked",
      value: data.totalBookmarks,
      icon: Bookmark,
      grad: "from-violet-500 to-pink-500",
    },
    {
      title: "Reviews",
      value: data.totalReviews,
      icon: MessageCircle,
      grad: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="space-y-6 px-4 sm:space-y-10 sm:px-6 lg:px-0">

  

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-cyan-600 to-blue-700 p-6 text-white sm:p-8 lg:rounded-[40px] lg:p-10">

        <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-white/10 blur-3xl" />

        <div className="relative">

          <div className="flex items-center gap-3">
            <Sparkles />

            <span>
              Premium Dashboard
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            Your Prompt Journey
          </h1>

          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base lg:text-lg">
            Track copied prompts, bookmarks and reviews.
          </p>

        </div>

      </div>

    

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 lg:gap-8">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-3xl border bg-card p-5 sm:p-6 lg:rounded-[34px] lg:p-8"
            >

              <div
                className={`absolute top-0 right-0 h-40 w-40 rounded-full bg-gradient-to-br opacity-20 blur-3xl ${item.grad}`}
              />

              <div className="relative">

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r text-white ${item.grad}`}
                >
                  <Icon size={26} />
                </div>

                <p className="mt-8 text-muted-foreground">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-black sm:text-4xl lg:text-5xl">
                  {item.value}
                </h2>

              </div>

            </div>
          );
        })}

      </div>

  

      {data.topPrompt && (
        <div className="overflow-hidden rounded-[40px] border bg-card">

          <img
            src={data.topPrompt.thumbnail}
            className="h-56 w-full object-cover sm:h-72 lg:h-[380px]"
          />

          <div className="p-8">

            <div className="flex items-center gap-2 text-yellow-500">
              <TrendingUp />

              Highest Copied
            </div>

            <h2 className="mt-5 text-2xl font-black sm:text-3xl lg:text-4xl">
              {data.topPrompt.title}
            </h2>

            <p className="mt-4 opacity-70">
              Copies: {data.topPrompt.copyCount}
            </p>

          </div>

        </div>
      )}

  

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 lg:gap-8">

        <div className="rounded-[34px] border bg-card p-8">

          <h2 className="text-3xl font-black">
            Copied Prompts
          </h2>

          <div className="mt-8 space-y-5">

            {data.copiedPrompts?.length === 0 ? (
              "No Data"
            ) : (
              data.copiedPrompts.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4"
                >

                  <img
                    src={item.prompt?.thumbnail}
                    className="h-20 w-20 rounded-3xl object-cover"
                  />

                  <div>

                    <h3 className="font-bold">
                      {item.prompt?.title}
                    </h3>

                    <p className="opacity-60">
                      {item.prompt?.copyCount} copies
                    </p>

                  </div>

                </div>
              ))
            )}

          </div>

        </div>

        <div className="rounded-3xl border bg-card p-5 sm:p-6 lg:p-8">

          <h2 className="text-3xl font-black">
            Bookmarked
          </h2>

          <div className="mt-8 space-y-5">

            {data.bookmarkedPrompts?.length === 0 ? (
              "No Data"
            ) : (
              data.bookmarkedPrompts.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4"
                >

                  <img
                    src={item.prompt?.thumbnail}
                    className="h-20 w-20 rounded-3xl object-cover"
                  />

                  <div>

                    <h3 className="font-bold">
                      {item.prompt?.title}
                    </h3>

                  </div>

                </div>
              ))
            )}

          </div>

        </div>

      </div>

    

      <div className="rounded-[34px] border bg-card p-8">

        <h2 className="text-3xl font-black">
          Your Reviews
        </h2>

        <div className="mt-8 space-y-5">

          {data.reviews?.length === 0 ? (
            <div>
              No Reviews
            </div>
          ) : (
            data.reviews.map((item) => (
              <div
                key={item._id}
                className="overflow-hidden rounded-[34px] border bg-muted/30"
              >

                {item.prompt?.thumbnail && (
                  <img
                    src={item.prompt.thumbnail}
                    className="h-52 w-full object-cover"
                  />
                )}

                <div className="p-6">

                  <h3 className="text-2xl font-black">
                    {item.prompt?.title || "Deleted Prompt"}
                  </h3>

                  <div className="mt-3 flex gap-1 text-yellow-500">
                    {"★".repeat(item.rating)}
                  </div>

                  <p className="mt-4 opacity-70">
                    {item.comment}
                  </p>

                </div>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}