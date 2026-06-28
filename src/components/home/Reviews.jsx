"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Star,
  Sparkles,
  MessageCircle,
} from "lucide-react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

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
      const res = await axiosInstance.get("/reviews");

      setReviews(res.data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-2">
      <div className="mb-14 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-5 py-2 text-emerald-500">
          <Sparkles size={16} />
          Community Reviews
        </div>

        <h2 className="text-5xl font-black">
          What Users Say
        </h2>

        <p className="mt-3 text-muted">
          Real feedback from PromptBay users.
        </p>
      </div>

      <div ref={emblaRef}>
        <div className="flex gap-7">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33%]"
            >
              <div className="group relative overflow-hidden rounded-[34px] border bg-card p-8">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          review.name
                        )}`}
                        className="h-16 w-16 rounded-[20px]"
                      />

                      <div>
                        <h3 className="font-black">
                          {review.name}
                        </h3>

                        <p className="text-sm text-muted">
                          {review.userEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={15}
                        fill={
                          star <= review.rating
                            ? "#eab308"
                            : "transparent"
                        }
                        className={
                          star <= review.rating
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }
                      />
                    ))}
                  </div>

                  <p className="mt-6 text-muted">
                    "{review.comment}"
                  </p>

                  <p className="mt-5 text-xs opacity-60">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}