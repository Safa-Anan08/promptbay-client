"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function MyPromptTable({ role }) {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/prompts/mine`, {
      withCredentials: true,
    });

    setPrompts(res.data.prompts);
  };

  const remove = async (id) => {
    if (!confirm("Delete Prompt?")) return;

    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/prompts/${id}`,
      { withCredentials: true }
    );

    load();
  };

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-bold">My Prompts</h1>

        <Link href={`/dashboard/${role}/add-prompt`}>
          <button className="px-5 py-3 rounded-xl bg-violet-600 text-white">
            + Add Prompt
          </button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {prompts.map((item) => (
          <div key={item._id} className="border rounded-3xl overflow-hidden">
            <img
              src={item.thumbnail}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <span>{item.status}</span>
              </div>

              <p className="mt-3 text-sm">
                {item.description?.slice(0, 100)}
              </p>

              <div className="mt-4">
                <span>Copies: {item.copyCount}</span>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-6">
                <Link href={`/prompt/${item._id}`}>
                  <button className="w-full border rounded py-2">
                    View
                  </button>
                </Link>

                <Link href={`/dashboard/${role}/my-prompts/${item._id}`}>
                  <button className="w-full border rounded py-2">
                    Edit
                  </button>
                </Link>

                <button className="border rounded py-2">
                  Analytics
                </button>

                <button
                  onClick={() => remove(item._id)}
                  className="bg-red-500 text-white rounded py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}