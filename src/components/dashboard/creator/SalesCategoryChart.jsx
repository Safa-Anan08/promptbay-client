"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
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

    <div className="glass-card rounded-[32px] p-7 h-full">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-black">
            Sales by Category
          </h2>

          <p className="text-muted-foreground mt-1">
            Last 30 Days
          </p>

        </div>

      </div>

      <div className="h-[320px] mt-6">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={4}
            >

              {

                data.map(
                  (
                    item,
                    index
                  )=>(

                    <Cell
                      key={item.name}
                      fill={colors[index]}
                    />

                  )
                )

              }

            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}