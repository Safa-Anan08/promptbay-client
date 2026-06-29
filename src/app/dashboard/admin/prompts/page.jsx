"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,CheckCircle2, Clock3,File ,User,XCircle, FileText,Eye,Pencil, Trash2,
} from "lucide-react";
import axiosInstance from "@/lib/axios";

export default function PromptTable() {
  const router = useRouter();

  const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

const [search, setSearch] = useState("");
const [filter, setFilter] = useState("all");
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

const [stats, setStats] = useState({
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
});
  useEffect(() => {
  load(page);
}, [page]);

const load = async (currentPage = page) => {
  try {
    setLoading(true);

    const [promptRes, statsRes] = await Promise.all([
      axiosInstance.get(
        `/prompts/admin/all?page=${currentPage}&limit=8`
      ),
      axiosInstance.get("/prompts/admin/stats"),
    ]);

    setData(promptRes.data.prompts || []);

    setTotalPages(
      promptRes.data.pagination?.totalPages || 1
    );

    setStats(
      statsRes.data.stats
    );

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  const approve = async (id) => {
    try {
      await axiosInstance.patch(`/prompts/approve/${id}`);

      load();
    } catch (err) {
      console.log(err);
    }
  };

  const reject = async (id) => {
    try {
      await axiosInstance.patch(`/prompts/reject/${id}`, {
        reason: "Rejected by admin",
      });

      load();
    } catch (err) {
      console.log(err);
    }
  };

  const edit = async (item) => {
    try {
      if (item.status === "approved") {
        await axiosInstance.patch(`/prompts/reject/${item._id}`, {
          reason: "Edited by admin",
        });
      } else if (item.status === "rejected") {
        await axiosInstance.patch(`/prompts/approve/${item._id}`);
      }

      load();
    } catch (err) {
      console.log(err);
    }
  };
  const remove = async (id) => {
    const confirmDelete =
      confirm(
        "Delete this prompt?"
      );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(
        `/prompts/${id}`
      );

      setData((prev) =>
        prev.filter(
          (item) =>
            item._id !== id
        )
      );
    } catch (err) {
      console.log(err);
    }
  };


  const filteredData =
    useMemo(() => {
      return data.filter(
        (item) => {
          const matchSearch =
            item.title
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            item.creatorEmail
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchFilter =
            filter === "all"
              ? true
              : item.status === filter;

          return (
            matchSearch &&
            matchFilter
          );
        }
      );
    }, [
      data,
      search,
      filter,
    ]);


  return (
    <div className="space-y-8">

      <div>

        <p className="text-emerald-500 font-semibold uppercase tracking-[4px]">
          Admin Panel
        </p>

        <h1 className="text-4xl font-black mt-2">
          Prompt Management
        </h1>

      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">

       <StatCard
  title="Total Prompts"
  value={stats.total}
  icon={<FileText size={28} />}
/>

<StatCard
  title="Pending Review"
  value={stats.pending}
  color="text-yellow-500"
  icon={<Clock3 size={28} />}
/>

<StatCard
  title="Approved"
  value={stats.approved}
  color="text-emerald-500"
  icon={<CheckCircle2 size={28} />}
/>

<StatCard
  title="Rejected"
  value={stats.rejected}
  color="text-red-500"
  icon={<XCircle size={28} />}
/>

      </div>

      <div className="glass-card p-6 rounded-3xl">

        <div className="flex flex-col lg:flex-row gap-4">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search prompt..."
              className="w-full rounded-2xl border border-border bg-transparent py-3 pl-12"
            />

          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value
              )
            }
            className="rounded-2xl border border-border px-5 bg-transparent"
          >

            <option value="all">
              All
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="approved">
              Approved
            </option>

            <option value="rejected">
              Rejected
            </option>

          </select>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">

        {loading ? (

          <div className="glass-card p-20 text-center">
            Loading...
          </div>

        ) : (

          filteredData.map(
            (item) => (

              <div
                key={item._id}
                className="glass-card rounded-3xl p-6"
              >

               <div
  key={item._id}
  className="group glass-card rounded-[32px] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(16,185,129,.15)]"
>
  <div className="relative">
    <img
      src={item.thumbnail || "https://placehold.co/900x600"}
      className="w-full h-60 object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

    <span
      className={`absolute top-5 left-5 px-4 py-2 rounded-full text-sm font-semibold ${
        item.status === "approved"
          ? "bg-emerald-500 text-white"
          : item.status === "pending"
          ? "bg-yellow-500 text-black"
          : "bg-red-500 text-white"
      }`}
    >
      {item.status}
    </span>
  </div>

  <div className="p-7">
    <h2 className="text-3xl font-black">
      {item.title}
    </h2>

    <p className="mt-4 text-muted-foreground line-clamp-2">
      {item.description}
    </p>

    <div className="flex flex-wrap gap-3 mt-6">
      <span className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm">
        <User/> {item.creatorName}
      </span>

      <span className="px-4 py-2 rounded-full bg-violet-500/10 text-violet-500 text-sm">
        <File/>  {item.category}
      </span>
    </div>

    <div className="border-t border-border mt-8 pt-7">
      <div className="flex flex-wrap gap-3">
        {item.status === "pending" && (
          <>
            <button
              onClick={() => approve(item._id)}
              className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition"
            >
              Approve
            </button>

            <button
              onClick={() => reject(item._id)}
              className="px-5 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
            >
              Reject
            </button>
          </>
        )}

        <button
          onClick={() => edit(item)}
          className="px-5 py-3 rounded-xl border border-border flex items-center gap-2 hover:border-blue-500 hover:text-blue-500 transition"
        >
          <Pencil size={18} />
          {item.status === "approved"
            ? "Reject"
            : item.status === "rejected"
            ? "Approve"
            : "Edit"}
        </button>

        <button
          onClick={() => router.push(`/prompts/${item._id}`)}
          className="px-5 py-3 rounded-xl border border-border flex items-center gap-2 hover:border-emerald-500 hover:text-emerald-500 transition"
        >
          <Eye size={18} />
          View
        </button>

        <button
          onClick={() => remove(item._id)}
          className="ml-auto px-5 py-3 rounded-xl bg-red-600 text-white flex items-center gap-2 hover:bg-red-700 transition"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  </div>
</div>
              </div>

            )
          )

        )}

      </div>

     <div className="flex justify-center items-center gap-3 mt-10">

     <button
        disabled={page===1}
       onClick={()=>
       setPage(page-1)
       }
      className="px-5 py-3 rounded-2xl border disabled:opacity-40">
         Previous
        </button>

     <div className="glass-card px-6 py-3 rounded-2xl">
      {page} / {totalPages}
       </div>

    <button
     disabled={page===totalPages}
     onClick={()=>
      setPage(page+1)
     }
    className="px-5 py-3 rounded-2xl border disabled:opacity-40">
    Next
      </button>

</div>
    </div>
  );
}

   function StatCard({ title,value,icon,
  color = "",
}) {
  return (
    <div className="glass-card rounded-3xl p-6">

      <div className="flex justify-between">

        <div>

          <p className="opacity-60">
            {title}
          </p>

          <h2 className={`text-4xl font-black ${color}`}>
            {value}
          </h2>

        </div>

        <div className={color}>
          {icon}
        </div>

      </div>

    </div>
  );
}