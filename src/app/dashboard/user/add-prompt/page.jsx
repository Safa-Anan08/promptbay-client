"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddPromptPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    visibility: "Public",
    difficulty: "Beginner",
  });

  const [open, setOpen] = useState(false);
  const [visibilityOpen, setVisibilityOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData(e.target);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/prompts`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Prompt Added");

      router.push("/dashboard/user/my-prompts");
    } catch (error) {
      console.log(error);

      alert(error?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-5 lg:px-0 py-4 sm:py-8 overflow-hidden">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 sm:mb-8">
             Add Prompt
          </h1>

       <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border bg-card p-4 sm:p-6 lg:p-8">
          <input
            name="title"
            required
            placeholder="Prompt Title"
            className="w-full rounded-2xl border p-4 text-sm sm:text-base"
          />

          <textarea
            name="description"
            required
            rows={4}
            placeholder="Description"
            className="w-full rounded-2xl border p-4 text-sm sm:text-base resize-none"/>

          <textarea
            name="content"
            required
            rows={10}
            placeholder="Prompt Content"
            className="w-full rounded-2xl border p-4 text-sm sm:text-base resize-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input
              name="category"
              required
              placeholder="Category"
              className="rounded-2xl border p-4"
            />

            <input
              name="tool"
              required
              placeholder="AI Tool"
              className="rounded-2xl border p-4"
            />
          </div>

          <input
            name="tags"
            placeholder="react,nextjs,chatgpt"
            className="w-full rounded-2xl border p-4"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <input
                type="hidden"
                name="difficulty"
                value={form.difficulty}
              />

              <Select
                open={open}
                onOpenChange={setOpen}
                value={form.difficulty}
                onValueChange={(value) =>
                  setForm({ ...form, difficulty: value })
                }
              >
                <SelectTrigger className="w-full h-12 sm:h-14 rounded-2xl">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <input
                type="hidden"
                name="visibility"
                value={form.visibility}
              />

              <Select
                open={visibilityOpen}
                onOpenChange={setVisibilityOpen}
                value={form.visibility}
                onValueChange={(value) =>
                  setForm({ ...form, visibility: value })
                }
              >
                <SelectTrigger className="w-full h-12 sm:h-14 rounded-2xl">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Public">Public</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <input
           type="file"
           name="image"
           accept="image/*"
           className="w-full rounded-2xl border p-3 text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:text-white"
      />

          <button
            disabled={loading}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-violet-600 text-white font-semibold transition hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Publish Prompt"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}