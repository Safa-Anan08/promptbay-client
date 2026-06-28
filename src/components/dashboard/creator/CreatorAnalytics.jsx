"use client";

import { ResponsiveContainer,
  AreaChart, Area, PieChart,
  Pie, Cell,Tooltip, CartesianGrid, XAxis,
  YAxis,
} from "recharts";

const earningsData = [
  { month: "May 1", earnings: 180 },
  { month: "May 5", earnings: 420 },
  { month: "May 9", earnings: 310 },
  { month: "May 13", earnings: 560 },
  { month: "May 17", earnings: 290 },
  { month: "May 22", earnings: 760 },
  { month: "May 26", earnings: 620 },
  { month: "May 29", earnings: 920 },
];

const categoryData = [
  {
    name: "Marketing",
    value: 40,
    color: "#22c55e",
  },
  {
    name: "Copywriting",
    value: 25,
    color: "#f59e0b",
  },
  {
    name: "Design",
    value: 20,
    color: "#38bdf8",
  },
  {
    name: "Others",
    value: 15,
    color: "#94a3b8",
  },
];

export default function CreatorAnalytics() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-6 w-full min-w-0">

      <div className="xl:col-span-2 w-full min-w-0 glass-card rounded-3xl border border-border p-4 sm:p-6 lg:p-7">

        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black">
              Earnings Overview
            </h2>

            <p className="text-sm text-muted-foreground mt-1">
              Last 30 Days
            </p>
          </div>

          <span className="text-emerald-500 font-semibold text-sm shrink-0">
            +18.2%
          </span>
        </div>

        <div className="mt-6 w-full h-[250px] sm:h-[320px] lg:h-[360px] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient
                  id="earningsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#22c55e"
                    stopOpacity={0.7}
                  />
                  <stop
                    offset="95%"
                    stopColor="#22c55e"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.15}
              />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 11 }}
              />

              <YAxis
                width={35}
                tick={{ fontSize: 11 }}
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#22c55e"
                strokeWidth={3}
                fill="url(#earningsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="w-full min-w-0 glass-card rounded-3xl border border-border p-4 sm:p-6 lg:p-7">

        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black">
            Sales by Category
          </h2>

          <p className="text-sm text-muted-foreground mt-1">
            This Month
          </p>
        </div>

        <div className="mt-6 w-full h-[250px] sm:h-[300px] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                innerRadius={45}
                outerRadius={80}
                paddingAngle={4}
              >
                {categoryData.map((item) => (
                  <Cell
                    key={item.name}
                    fill={item.color}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-5 space-y-3">
          {categoryData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="h-3 w-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />

                <span className="truncate text-sm sm:text-base">
                  {item.name}
                </span>
              </div>

              <span className="font-semibold text-sm sm:text-base">
                {item.value}%
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}