"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Bookmark, Copy, Crown, User, Sparkles ,Star} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Page() {
const [showReportModal,setShowReportModal]=useState(false);

const [reportReason,setReportReason]=useState("");
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [access, setAccess] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
const [bookmarked, setBookmarked] = useState(false);
const [copied, setCopied] = useState(false);
useEffect(() => {
  if (id) {
    load();
  }
}, [id]);
const load = async () => {
  try {
    const [promptRes, reviewRes] =
      await Promise.all([
        axiosInstance.get(
          `/prompts/details/${id}`
        ),

        axiosInstance.get(
          `/prompts/reviews/${id}`
        ),
      ]);

    const prompt =
      promptRes.data.prompt;

    setData(prompt);

    setAccess(
      promptRes.data.canAccess
    );

    setBookmarked(
      promptRes.data.isBookmarked || false
    );

    setCopied(
      promptRes.data.isCopied || false
    );

    setReviews(
      reviewRes.data.reviews || []
    );

  } catch (err) {

    console.log(err);

    toast.error(
      "Failed to load prompt"
    );

  }
};

const copyPrompt = async () => {
  try {

    const res =
      await axiosInstance.post(
        `/copies/${id}`
      );

    if (data?.content) {
      await navigator.clipboard.writeText(
        data.content
      );
    }

    setCopied(
      res.data.copied
    );

    setData(prev => ({
      ...prev,
      copyCount:
        res.data.copyCount,
    }));

    toast.success(
      res.data.message
    );

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Copy failed"
    );

  }
};

const bookmark = async () => {
  try {

    const res =
      await axiosInstance.post(
        `/bookmarks/${id}`
      );

    setBookmarked(
      res.data.bookmarked
    );

    setData(prev => ({
      ...prev,
      bookmarkCount:
        res.data.bookmarkCount,
    }));

    toast.success(
      res.data.message
    );

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Bookmark failed"
    );

  }
};

  const submitReview = async () => {
    if (!comment.trim()) return alert("Write a review");

    try {
      await axiosInstance.post(`/prompts/review/${id}`, {
        rating,
        comment,
      });

      setComment("");
      setRating(5);
      load();
      alert("Review Added");
    } catch (err) {
      alert(err?.response?.data?.message || "Review failed");
    }
  };

const reportPrompt = async () => {
  if (!reportReason.trim()) {
    return alert("Write report reason");
  }

  try {
    await axiosInstance.post(
      `/prompts/report/${id}`,
      {
        reason: reportReason,
      }
    );

    setReportReason("");

    toast.success("Report submitted");
  } catch (err) {
    toast.error(
      err?.response?.data?.message ||
      "Report failed"
    );
  }
};

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card px-10 py-8 rounded-3xl text-xl font-semibold">
          Loading Prompt...
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-24">

        <div className="relative overflow-hidden rounded-[35px]">
          <img
            src={data.thumbnail || "https://placehold.co/1600x700"}
            alt={data.title}
            className="h-[520px] w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="absolute bottom-10 left-8">
            <span className="inline-flex gap-2 rounded-full bg-white/10 px-5 py-2 backdrop-blur-xl text-white">
              <Sparkles size={18} />
              {data.category}
            </span>

            <h1 className="mt-6 text-6xl font-black text-white">
              {data.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg text-white/80">
              {data.description}
            </p>

            <div className="mt-8 flex justify-start gap-4">
           

<button
onClick={bookmark}
className={`flex items-center gap-2 rounded-2xl px-8 py-4 transition
${
bookmarked
? "bg-yellow-500 text-black"
: "btn-primary"
}`}
>

<Bookmark
size={18}
fill={
bookmarked
? "currentColor"
: "none"
}
/>

{
bookmarked
? "Bookmarked"
: "Bookmark"
}

</button>

              {access && (
<button
onClick={copyPrompt}
className={`flex items-center gap-2 rounded-2xl px-8 py-4
${
copied
? "bg-blue-600 text-white"
: "btn-premium"
}`}
>

<Copy size={18}/>

{
copied
? "Copied"
: "Copy Prompt"
}

</button>
              )}
            </div>
          </div>
          
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          <div className="lg:col-span-2">

            {access ? (
              <div className="glass-card rounded-[30px] p-8">

                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-3xl font-black">Prompt Content</h2>

<button
onClick={copyPrompt}
className={`flex items-center gap-2 rounded-2xl px-8 py-4
${
copied
? "bg-blue-600 text-white"
: "btn-premium"
}`}
>

<Copy size={18}/>

{
copied
? "Copied"
: "Copy Prompt"
}

</button>
                </div>

                <pre className="whitespace-pre-wrap leading-8">
                  {data.content}
                </pre>

              </div>
            ) : (
              <div className="glass-card rounded-[30px] p-14 text-center">
                <Crown size={56} className="mx-auto text-yellow-500" />

                <h2 className="mt-8 text-4xl font-black">
                  Premium Prompt
                </h2>

                <p className="mt-4 text-muted">
                  Subscribe to unlock full prompt
                </p>

                <button
                  onClick={() => router.push("/pricing")}
                  className="btn-primary mt-8"
                >
                  Upgrade
                </button>
              </div>
            )}

          </div>
          <div className="space-y-8">

            <div className="glass-card rounded-[30px] p-8">
              <h2 className="mb-8 text-2xl font-black">Details</h2>

              <div className="space-y-4">
                <p>Category: <b>{data.category}</b></p>
                <p>Tool: <b>{data.tool}</b></p>
                <p>Difficulty: <b>{data.difficulty}</b></p>
                <p>Creator: <b>{data.creatorName}</b></p>
                <p>Copies: <b>{data.copyCount}</b></p>
                <p>Reviews: <b>{data.reviewCount}</b></p>
                <p className="flex">
                  Rating: <b> <span className=" mx-2 flex gap-2"><Star/> {Number(data.rating || 0).toFixed(1)}</span></b>
                </p>
              </div>
            </div>

            <div className="glass-card rounded-[30px] p-8">
              <h2 className="mb-6 text-2xl font-black">Tags</h2>

              <div className="flex flex-wrap gap-3">
                {data.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-emerald-500/10 px-4 py-2 text-emerald-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {access && (
          <div className="mt-8">

            <div className="glass-card rounded-[30px] p-8">

              <h2 className="text-4xl font-black">Reviews & Rating</h2>

              <div className="mt-8">

                <label className="font-semibold">Your Rating</label>

                <Select
                  value={String(rating)}
                  onValueChange={(value) => setRating(Number(value))}
                >
                  <SelectTrigger className="mt-3 h-14 w-full rounded-2xl border border-border bg-background/60 px-4 backdrop-blur-xl">
                    <SelectValue placeholder="Select Rating" />
                  </SelectTrigger>

                  <SelectContent className="rounded-2xl border border-border bg-background/95 backdrop-blur-xl">
                    <SelectItem value="5">★★★★★</SelectItem>
                    <SelectItem value="4">★★★★☆</SelectItem>
                    <SelectItem value="3">★★★☆☆</SelectItem>
                    <SelectItem value="2">★★☆☆☆</SelectItem>
                    <SelectItem value="1">★☆☆☆☆</SelectItem>
                  </SelectContent>
                </Select>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review"
                  className="mt-5 min-h-[160px] w-full rounded-3xl border border-border bg-transparent p-5"
                />

                <div className=" flex mt-2 ">

                  <button
                    onClick={submitReview}
                    className="btn-primary px-8 py-4 "
                  >
                    Submit Review
                  </button>
                  <button onClick={() => setShowReportModal(true)} 
                  className="mx-2 border border-red-500 text-red-500 px-6 py-3 rounded-2xl hover:bg-red-500 hover:text-white transition">
                   Report Prompt
                    </button>
                </div>
              </div>
{showReportModal && (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
    <div className="w-[550px] rounded-[36px] bg-card border p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black">
          Report Prompt
        </h2>

        <button
          onClick={() => {
            setShowReportModal(false);
            setReportReason("");
          }}
          className="text-2xl"
        >
          X
        </button>
      </div>

      <p className="mt-3 text-muted-foreground">
        Tell us why you are reporting this prompt.
      </p>

      <textarea
        value={reportReason}
        onChange={(e) =>
          setReportReason(e.target.value)
        }
        placeholder="Write your report..."
        rows={6}
        className="mt-6 w-full rounded-2xl border p-5 resize-none outline-none"
      />

      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={() => setShowReportModal(false)}
          className="px-6 py-3 rounded-xl border"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            if (!reportReason.trim()) {
              return alert(
                "Please write a reason"
              );
            }

            await reportPrompt();

            setShowReportModal(false);
            setReportReason("");
          }}
          className="px-8 py-3 rounded-xl bg-red-600 text-white"
        >
          Submit Report
        </button>
      </div>
    </div>
  </div>
)}
            </div>

            
            <div className="mt-10">

              <h2 className="mb-8 text-3xl font-black">All Reviews</h2>

              <div className="space-y-5">

                {reviews.length === 0 ? (
                  <div className="glass-card rounded-[30px] p-10">
                    No reviews yet
                  </div>
                ) : (
                  reviews.map((item) => (
                    <div
                      key={item._id}
                      className="glass-card rounded-[30px] p-6"
                    >
                      <div className="flex justify-between">

                        <div className="flex items-center gap-3">

                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
                            <User size={18} />
                          </div>

                          <div>
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-yellow-500">
                              {"★".repeat(item.rating)}
                            </p>
                          </div>

                        </div>

                        <div className="text-red-500">
                          Flag
                        </div>

                      </div>

                      <p className="mt-5 opacity-80">
                        {item.comment}
                      </p>

                    </div>
                  ))
                )}

              </div>

            </div>

          </div>
        )}

      </section>
    </ProtectedRoute>
  );
  
}