"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import PromptCard from "../prompts/PromptCard";

export default function FeaturedPrompts() {
  const [prompts, setPrompts] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await axiosInstance.get("/prompts/featured");
      setPrompts(res.data.prompts);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="mx-auto mt-28 max-w-7xl px-6">
     
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="font-semibold uppercase tracking-[4px] text-emerald-500">
            Featured
          </p>

          <h2 className="mt-2 text-4xl font-black lg:text-5xl">
            Featured Prompts
          </h2>

          <p className="mt-3 max-w-xl text-muted">
            Hand-picked premium prompts loved by thousands of creators.
          </p>
        </div>

        <Link
          href={user ? "/prompts" : "/register"}
          className="hidden items-center gap-2 font-semibold text-emerald-400 transition hover:translate-x-1 md:flex"
        >
          {user ? "View All" : "Join Now"}

          <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {prompts.map((item) => (
          <div
            key={item._id}
            className="transition-all duration-300 hover:-translate-y-2"
          >
            <PromptCard item={item} />
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href={user ? "/prompts" : "/register"}
          className="btn-primary flex items-center gap-2"
        >
          {user ? "View All Prompts" : "See More"}

          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}