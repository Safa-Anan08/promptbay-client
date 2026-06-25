"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import LoadingModal from "@/components/LoadingModal";

export default function Page() {
  const { id } = useParams();

  const router = useRouter();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchPrompt();
  }, []);

  const fetchPrompt = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/prompts/mine/${id}`,
        {
          withCredentials: true,
        }
      );

      setData(res.data.prompt);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/prompts/${id}`,
      data,
      {
        withCredentials: true,
      }
    );

    router.push("/dashboard/user/my-prompts");
  };

  if (!data) {
    return (
      <div>
        <LoadingModal
          title="Checking Access..."
          description="Verifying your account and permissions."
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">

      <h1 className="mb-8 text-3xl font-bold">
        Update Prompt
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          value={data.title}
          onChange={(e) =>
            setData({
              ...data,
              title: e.target.value,
            })
          }
          className="w-full rounded border p-4"
        />

        <textarea
          rows={5}
          value={data.description}
          onChange={(e) =>
            setData({
              ...data,
              description: e.target.value,
            })
          }
          className="w-full rounded border p-4"
        />

        <textarea
          rows={10}
          value={data.content}
          onChange={(e) =>
            setData({
              ...data,
              content: e.target.value,
            })
          }
          className="w-full rounded border p-4"
        />

        <button className="rounded bg-violet-600 px-8 py-3 text-white">
          Update
        </button>

      </form>

    </div>
  );
}