"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {Star,Sparkles,} from "lucide-react";

export default function Creators() {
  const [creators, setCreators] = useState([]);

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [
      Autoplay({
        delay: 2500,
      }),
    ]
  );

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await axiosInstance.get("/prompts/top-creators");
      setCreators(res.data.creators);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-5 py-2 text-emerald-500">
          <Sparkles size={16} />
          Elite Creators
        </div>

        <h2 className="text-5xl font-black">
          Top Creators
        </h2>

        <p className="mt-3 text-muted-foreground">
          Meet the creators behind the best AI prompts.
        </p>
      </div>

      <div
        ref={emblaRef}
      
      >
        <div className="flex gap-7">
          {creators.map((creator) => {
            const rating = Math.round(creator.rating || 5);

            return (
              <div
                key={creator._id}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
              >
                <div className="group relative overflow-hidden rounded-[34px] border bg-card p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_80px_rgba(16,185,129,.18)]">
                  <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

                  <div className="relative">

                    <div className="flex items-start justify-between">
                      <img
                        src={
                          creator.image ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            creator.name
                          )}`
                        }
                        alt={creator.name}
                        className="h-16 w-16 rounded-[20px] border-2 border-border object-cover shadow-xl"
                      />

                      <div className="flex gap-1 rounded-full bg-muted/40 px-3 py-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            fill={star <= rating ? "#eab308" : "transparent"}
                            className={
                              star <= rating
                                ? "text-yellow-500"
                                : "text-gray-400"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="mt-6 text-2xl font-black">
                      {creator.name}
                    </h3>

                    <p className="mt-1 text-muted-foreground">
                      Prompts Creator
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}