"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { TriangleAlert, CircleCheck, User, Calendar } from "lucide-react";

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
        <h1 className="text-5xl font-black">
          Reports
        </h1>

        <p className="opacity-60 mt-2">
          Manage reported prompts
        </p>
      </div>

      <div className="rounded-[35px] border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/20">
              <th className="p-7 text-left">
                Date
              </th>

              <th className="text-left">
                User
              </th>

              <th className="text-left">
                Reason
              </th>

              <th className="text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {reports.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-muted/10 transition"
              >
                <td className="p-7">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-blue-500" />

                    <span>
                      {new Date(item.createdAt).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-violet-500" />

                    <span>
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
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold ${
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

      {reports.length === 0 && (
        <div className="rounded-[35px] border p-20 text-center">
          <h2 className="text-3xl font-black">
            No Reports Found
          </h2>

          <p className="mt-3 opacity-60">
            Users haven't submitted reports yet
          </p>
        </div>
      )}
    </div>
  );
}