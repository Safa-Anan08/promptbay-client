"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import useEmblaCarousel from "embla-carousel-react";
import {
  Code2,
  Palette,
  Megaphone,
  Globe,
  Briefcase,
  MessagesSquare,
  Sparkles,
} from "lucide-react";

export default function Categories() {
  const router = useRouter();

  const [categories, setCategories] = useState([]);

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await axiosInstance.get("/prompts/categories");

      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const icons = {
    Programming: <Code2 size={24} />,
    Design: <Palette size={24} />,
    Marketing: <Megaphone size={24} />,
    SEO: <Globe size={24} />,
    Business: <Briefcase size={24} />,
    Social: <MessagesSquare size={24} />,
  };

  return (
    <section className="mx-auto mt-24 max-w-7xl px-6">

      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-black lg:text-4xl">
            Popular Categories
          </h2>

          <p className="mt-2 text-muted">
            Discover prompts from the most popular categories.
          </p>
        </div>
      </div>

      <div
        ref={emblaRef}
        className="overflow-hidden"
      >
        <div className="flex gap-5">
          {categories.map((item) => (
            <div
              key={item._id || item.name}
              className="flex-[0_0_85%] sm:flex-[0_0_48%] lg:flex-[0_0_16.8%]"
            >
              <button
                onClick={() =>
                  router.push(
                    `/prompts?category=${encodeURIComponent(item.name)}`
                  )
                }
                className="group relative w-full overflow-hidden rounded-3xl border border-border bg-card p-6 text-left duration-300 hover:-translate-y-2 hover:border-emerald-500/40 hover:shadow-[0_20px_50px_rgba(46,139,87,.20)]"
              >
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 duration-300 group-hover:rotate-6 group-hover:scale-110">
                  {icons[item.name] || <Sparkles size={24} />}
                </div>

                <h3 className="relative z-10 mt-5 text-lg font-bold">
                  {item.name}
                </h3>

                <p className="relative z-10 mt-2 text-sm text-muted">
                  {item.totalPrompts || 0} Prompts
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}