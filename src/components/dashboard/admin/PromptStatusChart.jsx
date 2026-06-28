"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import {
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export default function PromptStatusChart() {
  const [stats, setStats] = useState({
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await axiosInstance.get(
        "/prompts/admin/stats"
      );

      setStats(res.data.stats);
    } catch (err) {
      console.log(err);
    }
  };

  const data = [
    {
      name: "Approved",
      value: stats.approved,
    },
    {
      name: "Pending",
      value: stats.pending,
    },
    {
      name: "Rejected",
      value: stats.rejected,
    },
  ];

  const COLORS = [
    "#10b981",
    "#f59e0b",
    "#ef4444",
  ];

  return (
    <div className="glass-card w-full min-w-0 rounded-2xl sm:rounded-[32px] border border-border p-4 sm:p-6 lg:p-7">
      <h2 className="text-2xl font-black">
        Prompt Status
      </h2>

      <div className="mt-6 w-full min-w-0 h-[260px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie
             data={data}
            dataKey="value"
            nameKey="name"
             innerRadius={45}
             outerRadius={75}
            >
              {data.map((item, index) => (
                <Cell
                  key={item.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}