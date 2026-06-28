"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import {
  TriangleAlert,  CircleCheck, User, Calendar,} from "lucide-react";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get("/admin/reports", {
          withCredentials: true,
        });

        setReports(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black md:text-5xl">
          Reports
        </h1>

        <p className="mt-2 text-sm opacity-60 md:text-base">
          Manage reported prompts
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="rounded-[28px] border p-14 text-center md:rounded-[35px] md:p-20">
          <h2 className="text-2xl font-black md:text-3xl">
            No Reports Found
          </h2>

          <p className="mt-3 opacity-60">
            Users haven't submitted reports yet
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[24px] border bg-card md:rounded-[35px]">
          {/* Desktop */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/20">
                  <th className="p-7 text-left">Date</th>
                  <th className="text-left">User</th>
                  <th className="text-left">Reason</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b transition hover:bg-muted/10"
                  >
                    <td className="p-7">
                      <div className="flex items-center gap-3">
                        <Calendar
                          size={18}
                          className="text-blue-500"
                        />

                        {new Date(item.createdAt).toLocaleDateString(
                          "en-GB"
                        )}
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center gap-3">
                        <User
                          size={18}
                          className="text-violet-500"
                        />

                        <span className="break-all">
                          {item.userEmail}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="max-w-[400px] line-clamp-2">
                        {item.reason}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold ${
                          item.status === "resolved"
                            ? "bg-emerald-500/15 text-emerald-600"
                            : "bg-yellow-500/15 text-yellow-600"
                        }`}
                      >
                        {item.status === "resolved" ? (
                          <CircleCheck size={18} />
                        ) : (
                          <TriangleAlert size={18} />
                        )}

                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="space-y-4 p-4 lg:hidden">
            {reports.map((item) => (
              <div
                key={item._id}
                className="rounded-3xl border p-5"
              >
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <User
                        size={16}
                        className="text-violet-500"
                      />

                      <h3 className="break-all font-bold">
                        {item.userEmail}
                      </h3>
                    </div>

                    <p className="mt-1 text-xs opacity-50">
                      <Calendar
                        size={12}
                        className="mr-1 inline"
                      />

                      {new Date(item.createdAt).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>
                  </div>

                  <span
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${
                      item.status === "resolved"
                        ? "bg-emerald-500/15 text-emerald-600"
                        : "bg-yellow-500/15 text-yellow-600"
                    }`}
                  >
                    {item.status === "resolved" ? (
                      <CircleCheck size={14} />
                    ) : (
                      <TriangleAlert size={14} />
                    )}

                    {item.status}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-xs opacity-50">
                    Reason
                  </p>

                  <p className="mt-2 break-words text-sm">
                    {item.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}