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
    <div className="glass-card rounded-[32px] p-7">
      <h2 className="text-2xl font-black">
        Prompt Status
      </h2>

      <div className="mt-8 h-80">
        <ResponsiveContainer>
          <RePieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
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