"use client";

import { ArrowRight, Sparkles, Rocket } from "lucide-react";

export default function PricingHero() {
  return (
    <section className="text-center pt-24">
      <div className="mb-20">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-500/10">
          <Rocket size={18} />
          Upgrade Your Experience
        </div>

        <h1 className="text-6xl font-black mt-8">
          Choose Your <br />
          <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
            Premium Plan
          </span>
        </h1>

        <p className="mt-6 text-lg opacity-70">
          Unlock premium prompts, creator growth and advanced access.
        </p>
      </div>
    </section>
  );
}