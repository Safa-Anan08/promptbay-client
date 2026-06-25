"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/bookmarks/mine`,
      {
        withCredentials: true,
      }
    );

    setData(res.data.saved);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Saved Prompts
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="border rounded-3xl p-5"
          >
            <img
              src={item.prompt.thumbnail}
              className="h-48 w-full object-cover rounded"
            />

            <h2 className="mt-4 text-2xl font-bold">
              {item.prompt.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}