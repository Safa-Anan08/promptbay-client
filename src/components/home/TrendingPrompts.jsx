"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {  Copy, Star } from "lucide-react";

export default function TrendingPrompts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/prompts?sort=popular`
    );

    setData(res.data.prompts.slice(0, 6));
  };

  return (
    <section className="max-w-7xl mx-auto py-24">
      <h2 className="text-4xl font-black mb-10"> Trending</h2>

      <div className="grid lg:grid-cols-3 gap-8">
        {data.map((item) => (
          <div
            key={item._id}
            className="rounded-3xl overflow-hidden border bg-card"
          >
            <img
              src={item.thumbnail}
              className="h-60 w-full object-cover"
            />

            <div className="p-6">
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="mt-3"><Star/> {item.rating}</p>
              <p><Copy/> {item.copyCount}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}