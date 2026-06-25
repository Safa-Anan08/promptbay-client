"use client";

import {
  Bot,
  Image,
  TrendingUp,
  Briefcase,
  Code2,
  Palette,
} from "lucide-react";

const prompts = [
  {
    name: "Midjourney",
    link: "https://www.midjourney.com",
    icon: Image,
  },
  {
    name: "ChatGPT",
    link: "https://chatgpt.com",
    icon: Bot,
  },
  {
    name: "Marketing",
    link: "https://www.hubspot.com",
    icon: TrendingUp,
  },
  {
    name: "Business",
    link: "https://www.forbes.com",
    icon: Briefcase,
  },
  {
    name: "React",
    link: "https://react.dev",
    icon: Code2,
  },
  {
    name: "Design",
    link: "https://www.figma.com",
    icon: Palette,
  },
];

export default function Trending() {
  return (
    <section className="max-w-7xl mx-auto py-28">

      <h2 className="text-6xl font-black mb-12">
        Trending
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {prompts.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div
                className="rounded-[32px] border bg-card p-10 transition-all duration-300 hover:scale-105 hover:border-emerald-500 hover:shadow-xl"
              >

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-white">
                  <Icon size={32} />
                </div>

                <h3 className="text-3xl font-bold mt-6">
                  {item.name}
                </h3>

                <p className="text-muted-foreground mt-3">
                  Explore {item.name}
                </p>

              </div>
            </a>
          );
        })}

      </div>

    </section>
  );
}