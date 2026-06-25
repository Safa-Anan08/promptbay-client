"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import {
  Crown,
  Star,
  Trophy,
  Medal,
  Award,
} from "lucide-react";

export default function TopCreators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    loadCreators();
  }, []);

  const loadCreators = async () => {
    try {
      const res = await axiosInstance.get(
        "/prompts/top-creators",
        {
          withCredentials: true,
        }
      );

      setCreators(
        res.data.creators || []
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getRankIcon = (index) => {
    if (index === 0) {
      return (
        <Trophy
          size={18}
          className="text-yellow-500"
        />
      );
    }

    if (index === 1) {
      return (
        <Medal
          size={18}
          className="text-zinc-400"
        />
      );
    }

    if (index === 2) {
      return (
        <Award
          size={18}
          className="text-orange-500"
        />
      );
    }

    return (
      <span className="font-black">
        #{index + 1}
      </span>
    );
  };

  return (
    <div className="glass-card rounded-[32px] p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[4px] text-yellow-500">
            Leaderboard
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Top Creators
          </h2>

          <p className="mt-2 text-muted-foreground">
            Highest Performing Creators
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-yellow-500/10">
          <Crown
            size={30}
            className="text-yellow-500"
          />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {creators.length === 0 ? (
          <div className="rounded-3xl border border-border p-12 text-center text-muted-foreground">
            No creators found
          </div>
        ) : (
          creators.map((creator, index) => (
            <div
              key={creator._id}
              className="
                group
                flex
                items-center
                justify-between
                rounded-3xl
                border
                border-border
                bg-card/40
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-emerald-500/40
                hover:shadow-[0_20px_50px_rgba(16,185,129,.12)]
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-r
                    from-emerald-500
                    to-teal-400
                    text-white
                  "
                >
                  {getRankIcon(index)}
                </div>

                <img
                  src={
                    creator.image ||
                    creator.photoURL ||
                    creator.profileImage ||
                    creator.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      creator.name
                    )}`
                  }
                  alt={creator.name}
                  className="h-14 w-14 shrink-0 rounded-2xl border-2 border-border object-cover shadow-md"
                />

                <div>
                  <h3 className="text-lg font-bold">
                    {creator.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2">
                    <Star
                      size={14}
                      className="fill-yellow-500 text-yellow-500"
                    />

                    <span className="text-sm text-muted-foreground">
                      {creator.prompts} Prompts
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="rounded-xl bg-emerald-500/10 px-4 py-2 font-bold text-emerald-500">
                  $
                  {Number(
                    creator.sales || 0
                  ).toLocaleString()}
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  Total Revenue
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}