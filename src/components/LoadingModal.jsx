"use client";

import { LoaderCircle } from "lucide-react";

export default function LoadingModal({
  title = "Loading...",
  description = "Please wait while we prepare everything for you.",
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-xl">

      <div className="relative w-[420px] overflow-hidden rounded-[36px] border border-border bg-card/80 p-10 shadow-2xl">

        <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-xl">

            <LoaderCircle
              size={42}
              className="animate-spin text-white"
            />

          </div>

          <h2 className="mt-8 text-3xl font-black">
            {title}
          </h2>

          <p className="mt-3 text-muted-foreground">
            {description}
          </p>

          <div className="mt-8 h-2 overflow-hidden rounded-full bg-muted">

            <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />

          </div>

        </div>

      </div>

    </div>
  );
}