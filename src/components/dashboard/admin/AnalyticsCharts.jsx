"use client";

import { ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis,
  Tooltip, CartesianGrid,
} from "recharts";

import {
  TrendingUp,
  DollarSign, Users, FileText,
} from "lucide-react";

const revenueData = [
  { month: "Jan", revenue: 2400 },
  { month: "Feb", revenue: 3200 },
  { month: "Mar", revenue: 4100 },
  { month: "Apr", revenue: 5300 },
  { month: "May", revenue: 6100 },
  { month: "Jun", revenue: 7600 },
];

const promptData = [
  { month: "Jan", prompts: 42 },
  { month: "Feb", prompts: 63 },
  { month: "Mar", prompts: 78 },
  { month: "Apr", prompts: 101 },
  { month: "May", prompts: 120 },
  { month: "Jun", prompts: 155 },
];

export default function AnalyticsCharts() {
  return (
  <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-6">

      <div className="xl:col-span-2 space-y-5 lg:space-y-6">
        <div className="glass-card rounded-[28px] lg:rounded-[32px] p-5 md:p-6 lg:p-7">
         <div className="flex items-start justify-between gap-4">
            <div>
             <h2 className="text-xl md:text-2xl font-black">
                Revenue Overview
              </h2>
              <p className="text-muted-foreground mt-1">
                Last 6 Months Revenue
              </p>
            </div>

            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center shrink-0">
              <TrendingUp className="text-emerald-500" />

            </div>
          </div>
          <div className="h-64 sm:h-72 lg:h-80 mt-6 lg:mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient
                    id="green"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#10b981"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#10b981"
                      stopOpacity={0}
                    />

                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  fill="url(#green)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-[28px] lg:rounded-[32px] p-5 md:p-6 lg:p-7">

          <div className="flex items-start justify-between gap-4">
            <div>
             <h2 className="text-xl md:text-2xl font-black">
                Prompt Uploads
              </h2>

              <p className="text-muted-foreground mt-1">
                Monthly Growth
              </p>
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-cyan-500/15 flex items-center justify-center shrink-0">
              <FileText className="text-cyan-500" />
            </div>
          </div>
          <div className="h-64 sm:h-72 lg:h-80 mt-6 lg:mt-8">
          <ResponsiveContainer width="100%" height="100%">
              <BarChart data={promptData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
              <YAxis />
                <Tooltip />
                <Bar
                  dataKey="prompts"
                  fill="#10b981"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-5 lg:gap-6">
        <div className="glass-card rounded-[28px] lg:rounded-[32px] p-5 md:p-6">

          <div className="flex justify-between items-center">
            <div>
              <p className="text-muted-foreground">
                Total Revenue
              </p>
             <h2 className="text-3xl lg:text-4xl font-black mt-2">
                $24,850
              </h2>
              <p className="text-emerald-500 mt-3">
                +18.4%
              </p>
            </div>

            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-emerald-500/15 flex items-center justify-center shrink-0">

              <DollarSign
                className="text-emerald-500"
                size={30}
              />
            </div>
          </div>
        </div>
        <div className="glass-card rounded-[32px] p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-muted-foreground">
                Active Creators
              </p>
              <h2 className="text-4xl font-black mt-2">
              2,487
              </h2>
              <p className="text-cyan-500 mt-3">
                +12%
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/15 flex items-center justify-center">
              <Users
                className="text-cyan-500"
                size={30}
              />
            </div>
          </div>
        </div>
        <div className="glass-card rounded-[32px] p-6">
          <h3 className="text-xl font-black">
            Platform Performance
          </h3>
          <div className="mt-6 space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <span>Total Sales</span>
                <span>84%</span>
              </div>
              <div className="h-3 rounded-full bg-white/10">
                <div className="h-3 rounded-full bg-emerald-500 w-[84%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>User Growth</span>
                <span>71%</span>
              </div>
              <div className="h-3 rounded-full bg-white/10">
                <div className="h-3 rounded-full bg-cyan-500 w-[71%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Subscriptions</span>
                <span>92%</span>
              </div>
              <div className="h-3 rounded-full bg-white/10">
                <div className="h-3 rounded-full bg-yellow-500 w-[92%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}