"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Eye,
  Pencil,
  BarChart3,
  Trash2,
  Plus,
  Copy,
} from "lucide-react";

export default function MyPromptTable({ role }) {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/prompts/mine`,
        {
          withCredentials: true,
        }
      );

      setPrompts(res.data.prompts || []);
    } catch (err) {
      console.log(err);
      setPrompts([]);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete Prompt?")) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/prompts/${id}`,
        {
          withCredentials: true,
        }
      );

      load();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading prompts...
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black">
            My Prompts
          </h1>

          <p className="text-muted-foreground mt-2">
            Manage your AI prompts
          </p>
        </div>

        <Link href={`/dashboard/${role}/add-prompt`}>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-violet-600 hover:bg-violet-700 transition px-6 py-3 text-white font-semibold">
            <Plus size={18} />
            Add Prompt
          </button>
        </Link>
      </div>

      {prompts.length === 0 ? (
        <div className="glass-card rounded-3xl p-16 text-center">
          <h2 className="text-2xl font-bold">
            No Prompt Found
          </h2>

          <p className="text-muted-foreground mt-2">
            Create your first AI prompt.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {prompts.map((item) => (
            <div
              key={item._id}
              className="glass-card rounded-3xl overflow-hidden border border-border"
            >
              <img
                src={
                  item.thumbnail ||
                  "https://placehold.co/800x500?text=Prompt"
                }
                alt={item.title}
                className="w-full h-52 sm:h-60 object-cover"
              />

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-black text-lg sm:text-xl line-clamp-2">
                    {item.title}
                  </h2>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
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

                <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                  {item.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm">
                  <Copy
                    size={16}
                    className="text-emerald-500"
                  />
                  <span>
                    {item.copyCount || 0} Copies
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  <Link href={`/prompt/${item._id}`}>
                    <button className="w-full rounded-xl border py-2 flex items-center justify-center gap-2 hover:bg-muted transition">
                      <Eye size={16} />
                      <span className="hidden sm:inline">
                        View
                      </span>
                    </button>
                  </Link>

                  <Link
                    href={`/dashboard/${role}/my-prompts/${item._id}`}
                  >
                    <button className="w-full rounded-xl border py-2 flex items-center justify-center gap-2 hover:bg-muted transition">
                      <Pencil size={16} />
                      <span className="hidden sm:inline">
                        Edit
                      </span>
                    </button>
                  </Link>

                  <button className="w-full rounded-xl border py-2 flex items-center justify-center gap-2 hover:bg-muted transition">
                    <BarChart3 size={16} />
                    <span className="hidden sm:inline">
                      Stats
                    </span>
                  </button>

                  <button
                    onClick={() => remove(item._id)}
                    className="w-full rounded-xl bg-red-500 hover:bg-red-600 text-white py-2 flex items-center justify-center gap-2 transition"
                  >
                    <Trash2 size={16} />
                    <span className="hidden sm:inline">
                      Delete
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}