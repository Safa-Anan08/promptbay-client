"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function CTA() {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-7xl px-6 py-2">
      <div className="glass-card relative overflow-hidden rounded-[40px] border border-border px-8 py-20 text-center lg:px-20">

        <div className="hero-glow-green absolute -top-24 -left-32" />

        <div className="hero-glow-gold absolute -right-24 bottom-0" />

       

        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm font-semibold">
          <Sparkles size={16} />
          Join 50,000+ AI Creators
        </div>

        <h2 className="text-5xl font-black leading-tight lg:text-6xl">
          Ready to Build
          <br />

          <span className="gradient-text">
            Better AI Prompts?
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted">
          Discover premium prompts, grow your audience, and unlock professional
          AI workflows created by top prompt engineers around the world.
        </p>

        <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
          {!user && (
            <Link
              href="/register"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-lg"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>
          )}

          <Link
            href="/prompts"
            className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-8 py-4 font-semibold duration-300 hover:scale-105"
          >
            Explore Prompts
          </Link>
        </div>
      </div>
    </section>
  );
}