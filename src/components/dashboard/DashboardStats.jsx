"use client";

import { FileText, Users, Star, DollarSign } from "lucide-react";

const stats = [
  { title: "Total Prompts", value: "124", icon: FileText },
  { title: "Users", value: "8.2k", icon: Users },
  { title: "Rating", value: "4.9", icon: Star },
  { title: "Revenue", value: "$12k", icon: DollarSign },
];

export default function DashboardStats() {
  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-[28px] border border-border bg-card p-8"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground">{item.title}</p>
              <h2 className="text-5xl font-black mt-3">{item.value}</h2>
            </div>

            <div className="h-14 w-14 rounded-2xl bg-violet-600 text-white flex items-center justify-center">
              <item.icon />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}