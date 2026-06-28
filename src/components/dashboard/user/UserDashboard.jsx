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

  if (!data) {
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
    <div className="w-full max-w-full overflow-hidden px-3 sm:px-5 space-y-5 sm:space-y-8">

      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-600 via-cyan-600 to-blue-700 px-5 py-8 text-white sm:p-8">

        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl sm:h-72 sm:w-72" />

        <div className="relative">

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Sparkles size={16} />
            Premium Dashboard
          </div>

          <h1 className="mt-4 text-[30px] font-black leading-tight sm:text-5xl">
            Your Prompt Journey
          </h1>

          <p className="mt-3 text-sm opacity-80 sm:text-base max-w-xl">
            Track copied prompts, bookmarks and reviews.
          </p>

        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-[28px] border bg-card p-5"
            >

              <div
                className={`absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${item.grad}`}
              />

              <div className="relative">

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white bg-gradient-to-r ${item.grad}`}
                >
                  <Icon size={22} />
                </div>

                <p className="mt-5 text-sm opacity-70">
                  {item.title}
                </p>

                <h2 className="mt-2 text-4xl font-black sm:text-5xl">
                  {item.value}
                </h2>

              </div>
            </div>
          );
        })}
      </div>

      {data.topPrompt && (
        <div className="overflow-hidden rounded-[28px] border bg-card">

          <img
            src={data.topPrompt.thumbnail}
            className="h-[220px] w-full object-cover sm:h-[320px]"
          />

          <div className="p-5">

            <div className="flex items-center gap-2 text-sm text-yellow-500">
              <TrendingUp size={16} />
              Highest Copied
            </div>

            <h2 className="mt-4 break-words text-2xl font-black sm:text-4xl">
              {data.topPrompt.title}
            </h2>

            <p className="mt-2 opacity-70">
              Copies: {data.topPrompt.copyCount}
            </p>

          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        {[
          {
            title: "Copied Prompts",
            list: data.copiedPrompts,
            showCount: true,
          },
          {
            title: "Bookmarked",
            list: data.bookmarkedPrompts,
          },
        ].map((section) => (
          <div
            key={section.title}
            className="rounded-[28px] border bg-card p-5"
          >

            <h2 className="text-2xl font-black">
              {section.title}
            </h2>

            <div className="mt-5 space-y-4">

              {section.list?.length === 0
                ? "No Data"
                : section.list.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-start gap-3"
                    >

                      <img
                        src={item.prompt?.thumbnail}
                        className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                      />

                      <div className="min-w-0">

                        <h3 className="break-words font-bold">
                          {item.prompt?.title}
                        </h3>

                        {section.showCount && (
                          <p className="text-sm opacity-60">
                            {item.prompt?.copyCount} copies
                          </p>
                        )}

                      </div>

                    </div>
                  ))}

            </div>

          </div>
        ))}

      </div>

      <div className="rounded-[28px] border bg-card p-5">

        <h2 className="text-2xl font-black">
          Your Reviews
        </h2>

        <div className="mt-5 space-y-5">

          {data.reviews?.length === 0
            ? "No Reviews"
            : data.reviews.map((item) => (
                <div
                  key={item._id}
                  className="overflow-hidden rounded-[28px] border"
                >

                  {item.prompt?.thumbnail && (
                    <img
                      src={item.prompt.thumbnail}
                      className="h-[180px] w-full object-cover"
                    />
                  )}

                  <div className="p-5">

                    <h3 className="break-words text-xl font-black">
                      {item.prompt?.title || "Deleted Prompt"}
                    </h3>

                    <div className="mt-2 text-yellow-500">
                      {"★".repeat(item.rating)}
                    </div>

                    <p className="mt-3 break-words text-sm opacity-70">
                      {item.comment}
                    </p>

                  </div>

                </div>
              ))}

        </div>

      </div>

    </div>
  );
}