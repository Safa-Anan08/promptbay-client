"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      const form = new FormData(e.target);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/prompts`,
        form,
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
      console.log(error.response?.data);

      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
     return(
         <ProtectedRoute>
          <div className="max-w-4xl mx-auto">

           <h1 className="text-4xl font-bold mb-8">
        Add Prompt</h1>

<form onSubmit={handleSubmit} className="space-y-5">
  <input
    name="title"
    required
    placeholder="Prompt Title"
    className="w-full border rounded-xl p-4"
  />

  <textarea
    name="description"
    required
    rows={3}
    placeholder="Description"
    className="w-full border rounded-xl p-4"
  />

  <textarea
    name="content"
    required
    rows={8}
    placeholder="Prompt Content"
    className="w-full border rounded-xl p-4"
  />

  <div className="grid md:grid-cols-2 gap-5">
    <input
      name="category"
      required
      placeholder="Category"
      className="border rounded-xl p-4"
    />

    <input
      name="tool"
      required
      placeholder="AI Tool"
      className="border rounded-xl p-4"
    />
  </div>

  <input
    name="tags"
    placeholder="react,nextjs,chatgpt"
    className="w-full border rounded-xl p-4"
  />

  <div
    className={`grid md:grid-cols-2 gap-5 transition-all ${
      open ? "mb-10" : "mb-0"
    }`}
  >
    <div className="mb-5">
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
          setForm({
            ...form,
            difficulty: value,
          })
        }
      >
        <SelectTrigger className="w-full h-14 rounded-xl">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Beginner">
            Beginner
          </SelectItem>

          <SelectItem value="Intermediate">
            Intermediate
          </SelectItem>

          <SelectItem value="Pro">
            Pro
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div
      className={`grid md:grid-cols-2 gap-5 transition-all ${
        open || visibilityOpen ? "mb-15" : "mb-0"
      }`}
    >
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
          setForm({
            ...form,
            visibility: value,
          })
        }
      >
        <SelectTrigger className="w-full h-14 rounded-xl">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Public">
            Public
          </SelectItem>

          <SelectItem value="Private">
            Private
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>

  <input
    type="file"
    name="image"
    accept="image/*"
    className="w-full border rounded-xl p-4"
  />

  <button
    disabled={loading}
    className="bg-violet-600 text-white px-8 py-4 rounded-xl"
  >
    {loading ? "Uploading..." : "Publish Prompt"}
  </button>
</form>

</div>
</ProtectedRoute>
);

}