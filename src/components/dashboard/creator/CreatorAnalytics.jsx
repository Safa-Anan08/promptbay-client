"use client";

import { ResponsiveContainer, AreaChart,
  Area, PieChart, Pie,
 Cell, Tooltip,
  CartesianGrid, XAxis,
  YAxis,
} from "recharts";

const earningsData = [
  {
    month: "May 1",
    earnings: 180,
  },
  {
    month: "May 5",
    earnings: 420,
  },
  {
    month: "May 9",
    earnings: 310,
  },
  {
    month: "May 13",
    earnings: 560,
  },
  {
    month: "May 17",
    earnings: 290,
  },
  {
    month: "May 22",
    earnings: 760,
  },
  {
    month: "May 26",
    earnings: 620,
  },
  {
    month: "May 29",
    earnings: 920,
  },
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
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="glass-card rounded-[32px] border border-border p-7 xl:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black">
              Earnings Overview
            </h2>

            <p className="mt-1 text-muted-foreground">
              Last 30 Days
            </p>
          </div>

          <span className="text-sm font-semibold text-emerald-500">
            +18.2%
          </span>
        </div>

        <div className="mt-8 h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
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

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#22c55e"
                strokeWidth={4}
                fill="url(#earningsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card rounded-[32px] border border-border p-7">
        <div>
          <h2 className="text-2xl font-black">
            Sales by Category
          </h2>

          <p className="mt-1 text-muted-foreground">
            This Month
          </p>
        </div>

        <div className="mt-6 h-64">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                innerRadius={55}
                outerRadius={85}
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

        <div className="mt-4 space-y-4">
          {categoryData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: item.color,
                  }}
                />

                <span>
                  {item.name}
                </span>
              </div>

              <span className="font-semibold">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}