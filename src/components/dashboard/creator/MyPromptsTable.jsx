"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { Eye, Search, Plus, Star, Copy, Bookmark } from "lucide-react";

export default function MyPromptsTable() {
  const [prompts, setPrompts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const res = await axiosInstance.get("/prompts/creator/top-prompts", { withCredentials: true });
      setPrompts(res.data.prompts || []);
    } catch (err) {
      console.log(err);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this prompt?")) return;
    try {
      await axiosInstance.delete(`/prompts/${id}`, { withCredentials: true });
      load();
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = useMemo(() =>
    prompts.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    ),
    [prompts, search]
  );

  return (
    <div className="glass-card rounded-[32px] p-7">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h2 className="text-3xl font-black">Top Performing Prompts</h2>
          <p className="text-muted-foreground mt-2">Sorted by copies, bookmarks & ratings</p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prompt..."
              className="h-12 w-64 rounded-2xl border border-border bg-transparent pl-11 pr-4 outline-none"
            />
          </div>

          <Link
            href="/dashboard/creator/add-prompt"
            className="h-12 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2"
          >
            <Plus size={18} />
            New Prompt
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-5">Prompt</th>
              <th>Copies</th>
              <th>Bookmarks</th>
              <th>Rating</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item._id} className="border-b border-border hover:bg-white/5">
                <td className="py-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.thumbnail || "https://placehold.co/80"}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                    <h3 className="font-bold">{item.title}</h3>
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-2 justify-center">
                    <Copy size={16} className="text-emerald-500" />
                    {item.copyCount}
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-2 justify-center">
                    <Bookmark size={16} className="text-cyan-500" />
                    {item.bookmarkCount}
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-1 justify-center">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    {Number(item.rating || 0).toFixed(1)}
                  </div>
                </td>

                <td>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    item.status === "approved"
                      ? "bg-emerald-500/15 text-emerald-500"
                      : item.status === "pending"
                      ? "bg-yellow-500/15 text-yellow-500"
                      : "bg-red-500/15 text-red-500"
                  }`}>
                    {item.status}
                  </span>
                </td>

                <td>
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/prompts/${item._id}`}
                      className="w-10 h-10 rounded-xl border flex items-center justify-center"
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
    </div>
  );
}