"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Search,
  CheckCircle2,  Clock3,
  XCircle,  FileText,  Eye,  Pencil,
  Trash2,
} from "lucide-react";
import LoadingModal from "@/components/LoadingModal";

export default function PromptTable() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/prompts/admin/all");

      setData(res.data.prompts || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/prompts/approve/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      load();
    } catch (err) {
      console.log(err);
    }
  };

  const reject = async (id) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/prompts/reject/${id}`,
        {
          reason: "Rejected by admin",
        },
        {
          withCredentials: true,
        }
      );

      load();
    } catch (err) {
      console.log(err);
    }
  };

  const remove = async (id) => {
    const confirmDelete = confirm("Delete this prompt?");

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/prompts/${id}`);

      setData((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const edit = async (item) => {
    try {
      if (item.status === "approved") {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/prompts/reject/${item._id}`,
          {
            reason: "Edited by admin",
          },
          {
            withCredentials: true,
          }
        );
      } else if (item.status === "rejected") {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/prompts/approve/${item._id}`,
          {},
          {
            withCredentials: true,
          }
        );
      }

      load();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        item.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.creatorEmail
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchFilter =
        filter === "all"
          ? true
          : item.status === filter;

      return matchSearch && matchFilter;
    });
  }, [data, search, filter]);

  const stats = {
    total: data.length,

    pending: data.filter(
      (i) => i.status === "pending"
    ).length,

    approved: data.filter(
      (i) => i.status === "approved"
    ).length,

    rejected: data.filter(
      (i) => i.status === "rejected"
    ).length,
  };

  return (
    <div className="space-y-8">

      <div>

        <p className="mt-2 font-semibold uppercase tracking-[4px] text-emerald-500">
          Admin Panel
        </p>

        <h1 className="mt-2 text-4xl font-black">
          Prompt Management
        </h1>

      </div>

      <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">

        <StatCard
          title="Total"
          value={stats.total}
          icon={<FileText />}
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          color="text-yellow-500"
          icon={<Clock3 />}
        />

        <StatCard
          title="Approved"
          value={stats.approved}
          color="text-emerald-500"
          icon={<CheckCircle2 />}
        />

        <StatCard
          title="Rejected"
          value={stats.rejected}
          color="text-red-500"
          icon={<XCircle />}
        />

      </div>

      <div className="glass-card rounded-3xl p-6">

        <div className="flex flex-col gap-4 lg:flex-row">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute top-1/2 left-4 -translate-y-1/2"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search prompt..."
              className="w-full rounded-2xl border border-border bg-transparent py-3 pl-12"
            />

          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="rounded-2xl border border-border bg-transparent px-5"
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

      <div className="grid gap-6">

        {loading ? (

          <LoadingModal
            title="Checking Access..."
            description="Verifying your account and permissions."
          />

        ) : (

          filteredData.map((item) => (

            <div
              key={item._id}
              className="glass-card rounded-3xl p-6"
            >

              <div className="flex flex-col gap-6 lg:flex-row">

                <img
                  src={
                    item.thumbnail ||
                    "https://placehold.co/160"
                  }
                  className="h-40 w-full rounded-3xl object-cover lg:w-40"
                />

                <div className="flex-1">

                  <h2 className="text-2xl font-black">
                    {item.title}
                  </h2>

                  <p className="mt-2 opacity-60">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">

                    <span>
                      {item.creatorName}
                    </span>

                    <span>
                      {item.category}
                    </span>

                    <span className="capitalize">
                      {item.status}
                    </span>

                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">

                    {item.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            approve(item._id)
                          }
                          className="rounded-xl bg-green-600 px-5 py-3 text-white"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            reject(item._id)
                          }
                          className="rounded-xl bg-yellow-600 px-5 py-3 text-white"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    <button
                      onClick={() =>
                        edit(item)
                      }
                      className="flex gap-2 rounded-xl border px-5 py-3"
                    >

                      <Pencil size={18} />

                      {item.status === "approved"
                        ? "Reject"
                        : item.status === "rejected"
                        ? "Approve"
                        : "Edit"}

                    </button>

                    <button
                      onClick={() =>
                        remove(item._id)
                      }
                      className="flex gap-2 rounded-xl bg-red-600 px-5 py-3 text-white"
                    >

                      <Trash2 size={18} />

                      Delete

                    </button>

                    <button
                      onClick={() =>
                        router.push(
                          `/prompts/${item._id}`
                        )
                      }
                      className="flex gap-2 rounded-xl border px-5 py-3"
                    >

                      <Eye size={18} />

                      View

                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
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