"use client";

import { Search } from "lucide-react";
import {
  Suspense,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

function HeroContent() {
  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const [search, setSearch] =
    useState(
      searchParams.get(
        "search"
      ) || ""
    );

  const handleSearch =
    () => {
      if (
        !search.trim()
      )
        return;

      router.push(
        `/prompts?search=${encodeURIComponent(
          search
        )}`
      );
    };

  const handleTagSearch =
    (value) => {
      setSearch(
        value
      );

      router.push(
        `/prompts?search=${encodeURIComponent(
          value
        )}`
      );
    };

  return (
    <section className="mx-auto max-w-7xl px-6 pt-10">

      <div className="grid items-center gap-10 lg:grid-cols-2">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            AI Prompt Marketplace
          </div>

          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Unleash Creativity.
            <br />

            <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-lime-300 bg-clip-text text-transparent">
              Create Magic.
            </span>

          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted">
            Discover, share and use premium AI prompts crafted by creators around the world.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">

            <div className="relative flex-1">

              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key ===
                    "Enter"
                  ) {
                    handleSearch();
                  }
                }}
                placeholder="What are you looking for?"
                className="h-14 w-full rounded-2xl border border-border bg-card pl-14 pr-4 outline-none focus:border-emerald-500"
              />

            </div>

            <button
              onClick={
                handleSearch
              }
              className="btn-primary px-10"
            >
              Search
            </button>

          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">

            <span className="text-sm text-muted">
              Popular:
            </span>

            {[
              "ChatGPT",
              "Midjourney",
              "Claude",
              "Gemini",
              "DALL·E",
            ].map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  handleTagSearch(
                    tag
                  )
                }
                className="rounded-xl border border-border bg-card px-4 py-2 text-sm hover:border-emerald-500 hover:text-emerald-400"
              >
                {tag}
              </button>
            ))}

          </div>

        </div>

        <div>

          <div className="relative overflow-hidden rounded-[32px]">

            <img
              src="../images/hero.png"
              alt="Hero"
              className="h-[620px] w-full object-cover"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default function Hero() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center">
          Loading...
        </div>
      }
    >
      <HeroContent />
    </Suspense>
  );
}