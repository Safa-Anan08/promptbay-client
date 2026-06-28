"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import {
  Eye, Search,  Plus,  Star, Copy,
  Bookmark,
} from "lucide-react";

export default function MyPromptsTable() {
  const [prompts, setPrompts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await axiosInstance.get(
        "/prompts/creator/top-prompts",
        {
          withCredentials: true,
        }
      );

      setPrompts(res.data.prompts || []);
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = useMemo(
    () =>
      prompts.filter((item) =>
        item.title
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [prompts, search]
  );

  return (
    <div className="glass-card rounded-3xl border border-border p-4 sm:p-6 lg:p-8">


      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Top Performing Prompts
          </h2>

          <p className="mt-2 text-muted-foreground">
            Sorted by copies, bookmarks & ratings
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search prompt..."
              className="h-12 w-full rounded-2xl border border-border bg-transparent pl-11 pr-4"
            />

          </div>

          <Link
            href="/dashboard/creator/add-prompt"
            className="h-12 rounded-2xl bg-emerald-600 px-6 text-white flex items-center justify-center gap-2 hover:bg-emerald-500"
          >
            <Plus size={18} />
            New Prompt
          </Link>

        </div>

      </div>


      <div className="space-y-4 lg:hidden">

        {filtered.map((item) => (

          <div
            key={item._id}
            className="rounded-2xl border border-border p-4"
          >

            <div className="flex gap-4">

              <img
                src={
                  item.thumbnail ||
                  "https://placehold.co/100"
                }
                alt={item.title}
                className="h-20 w-20 rounded-xl object-cover"
              />

              <div className="flex-1 min-w-0">

                <h3 className="truncate font-bold">
                  {item.title}
                </h3>

                <p className="text-xs text-muted-foreground">
                  {item.tool}
                </p>

                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === "approved"
                      ? "bg-green-500/15 text-green-500"
                      : item.status === "pending"
                      ? "bg-yellow-500/15 text-yellow-500"
                      : "bg-red-500/15 text-red-500"
                  }`}
                >
                  {item.status}
                </span>

              </div>

            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">

              <div>

                <Copy
                  size={16}
                  className="mx-auto text-emerald-500"
                />

                <p className="font-bold">
                  {item.copyCount}
                </p>

              </div>

              <div>

                <Bookmark
                  size={16}
                  className="mx-auto text-cyan-500"
                />

                <p className="font-bold">
                  {item.bookmarkCount}
                </p>

              </div>

              <div>

                <Star
                  size={16}
                  className="mx-auto fill-yellow-400 text-yellow-400"
                />

                <p className="font-bold">
                  {Number(item.rating || 0).toFixed(1)}
                </p>

              </div>

            </div>

            <Link
              href={`/prompts/${item._id}`}
              className="mt-5 flex h-11 items-center justify-center gap-2 rounded-xl border"
            >
              <Eye size={18} />
              View Prompt
            </Link>

          </div>

        ))}

      </div>


      <div className="hidden lg:block overflow-hidden rounded-2xl border border-border">

        <table className="w-full">

          <thead className="bg-muted/30">

            <tr>

              <th className="px-6 py-5 text-left">
                Prompt
              </th>

              <th>Copies</th>

              <th>Bookmarks</th>

              <th>Rating</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((item) => (

              <tr
                key={item._id}
                className="border-t border-border hover:bg-white/5"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={
                        item.thumbnail ||
                        "https://placehold.co/80"
                      }
                      alt={item.title}
                      className="h-16 w-16 rounded-2xl object-cover"
                    />

                    <div>

                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {item.tool}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="text-center">
                  {item.copyCount}
                </td>

                <td className="text-center">
                  {item.bookmarkCount}
                </td>

                <td className="text-center">

                  <div className="flex justify-center items-center gap-1">

                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    {Number(item.rating || 0).toFixed(1)}

                  </div>

                </td>

                <td className="text-center">

                  <span
                    className={`inline-flex rounded-full px-3 py-2 text-sm font-semibold ${
                      item.status === "approved"
                        ? "bg-green-500/15 text-green-500"
                        : item.status === "pending"
                        ? "bg-yellow-500/15 text-yellow-500"
                        : "bg-red-500/15 text-red-500"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center">

                    <Link
                      href={`/prompts/${item._id}`}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border"
                    >
                      <Eye size={18} />
                    </Link>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {filtered.length === 0 && (

        <div className="py-10 text-center text-muted-foreground">

          No prompts found.

        </div>

      )}

    </div>
  );
}