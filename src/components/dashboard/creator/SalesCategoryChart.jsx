
"use client";

import {
  ResponsiveContainer, PieChart,
  Pie, Cell, Tooltip, Legend,
} from "recharts";

const data = [
  {
    name: "Marketing",
    value: 40,
  },
  {
    name: "Copywriting",
    value: 25,
  },
  {
    name: "Design",
    value: 20,
  },
  {
    name: "Others",
    value: 15,
  },
];

const colors = [
  "#22c55e",
  "#f59e0b",
  "#38bdf8",
  "#8b5cf6",
];

export default function SalesCategoryChart() {
  return (
    <div className="glass-card w-full min-w-0 rounded-2xl sm:rounded-[32px] border border-border p-4 sm:p-6 lg:p-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black">
            Sales by Category
          </h2>

          <p className="mt-1 text-sm sm:text-base text-muted-foreground">
            Last 30 Days
          </p>
        </div>
      </div>

      <div className="mt-6 w-full min-w-0 h-[260px] sm:h-[320px]">
  <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={45}
              outerRadius={75}
              paddingAngle={4}
            >
              {data.map((item, index) => (
                <Cell
                  key={item.name}
                  fill={colors[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              align="center"
              layout="horizontal"
              wrapperStyle={{
                fontSize: "12px",
                paddingTop: "10px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

