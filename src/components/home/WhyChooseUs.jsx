"use client";

import {
  Sparkles, Shield, Rocket, Crown,
  TrendingUp,Users,
} from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Premium Quality",
    desc: "Access carefully crafted prompts designed for better AI output and real productivity.",
  },

  {
    icon: TrendingUp,
    title: "Boost Productivity",
    desc: "Skip endless trial-and-error and start generating results instantly.",
  },

  {
    icon: Crown,
    title: "Exclusive Content",
    desc: "Unlock premium prompt collections and creator-only releases.",
  },

  {
    icon: Shield,
    title: "Secure Platform",
    desc: "Protected accounts, reliable payments and seamless experiences.",
  },

  {
    icon: Users,
    title: "Creator Community",
    desc: "Join thousands of creators and grow with a global audience.",
  },

  {
    icon: Sparkles,
    title: "Modern AI Workflow",
    desc: "Built for professionals who want faster and smarter AI execution.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">

      <div className="relative overflow-hidden rounded-[40px] glass-card px-8 py-20 lg:px-16">

        <div className="hero-glow-green absolute -top-32 -left-32" />

        <div className="hero-glow-gold absolute -bottom-32 right-0" />

        <div className="relative">

          <div className="text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm font-semibold">

              <Sparkles size={16} />

              Why Choose PromptBay

            </div>

            <h2 className="mt-8 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">

              Built For

              <br />

              <span className="gradient-text">
                Serious AI Creators
              </span>

            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted">

              Discover premium prompts, smarter workflows,
              and tools that help creators and users get more
              from AI every day.

            </p>

          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="glass-card rounded-[32px] p-8 hover:-translate-y-2"
                >

                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">

                    <Icon size={28} />

                  </div>

                  <h3 className="mt-8 text-2xl font-black">

                    {item.title}

                  </h3>

                  <p className="mt-4 leading-7 text-muted">

                    {item.desc}

                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}