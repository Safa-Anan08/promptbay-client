"use client";

import {
  Check,
  X,
  Sparkles,
  Rocket,
  Crown,
} from "lucide-react";

const rows = [
  { feature: "Prompt Limit", free: "3 / day", pro: "Unlimited", growth: "Unlimited", premium: "Unlimited" },
  { feature: "Premium Prompts", free: false, pro: true, growth: true, premium: true },
  { feature: "Creator Tools", free: false, pro: true, growth: true, premium: true },
  { feature: "Analytics", free: false, pro: false, growth: true, premium: true },
  { feature: "Priority Support", free: false, pro: false, growth: true, premium: true },
  { feature: "Exclusive Releases", free: false, pro: false, growth: false, premium: true },
];

function Cell({ value }) {
  if (value === true)
    return (
      <div className="flex justify-center">
        <Check className="text-emerald-500 w-4 h-4 md:w-6 md:h-6" />
      </div>
    );

  if (value === false)
    return (
      <div className="flex justify-center">
        <X className="text-red-500 w-4 h-4 md:w-5 md:h-5" />
      </div>
    );

  return (
    <span className="font-semibold text-xs md:text-base">
      {value}
    </span>
  );
}

export default function ComparisonTable() {
  return (
    <section className="mt-20 md:mt-32">

      <div className="text-center mb-8 md:mb-12">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-sm">
          <Sparkles size={16} />
          Compare Plans
        </div>

        <h2 className="text-3xl md:text-5xl font-black mt-5">
          Everything Included
        </h2>

        <p className="opacity-60 mt-3 text-sm md:text-base px-4">
          Choose the level that fits your workflow
        </p>

      </div>

      <div className="rounded-3xl md:rounded-[40px] border backdrop-blur-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>

              <tr className="bg-black text-white">

                <th className="text-left px-4 py-5 md:p-8 text-sm md:text-base">
                  Feature
                </th>

                <th className="px-4 py-5 text-sm md:text-base">
                  Free
                </th>

                <th className="px-4 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600">

                  <div className="flex justify-center items-center gap-2 text-sm md:text-base">
                    <Rocket size={16} />
                    Pro
                  </div>

                </th>

                <th className="px-4 py-5 bg-gradient-to-r from-cyan-600 to-blue-700 text-sm md:text-base">
                  Growth
                </th>

                <th className="px-4 py-5 bg-gradient-to-r from-yellow-500 to-orange-500">

                  <div className="flex justify-center items-center gap-2 text-sm md:text-base">
                    <Crown size={16} />
                    Premium
                  </div>

                </th>

              </tr>

            </thead>

            <tbody>

              {rows.map((row, index) => (
                <tr
                  key={row.feature}
                  className={`
                    border-b
                    hover:bg-white/5
                    transition
                    ${index % 2 === 0 ? "bg-muted/20" : ""}
                  `}
                >

                  <td className="px-4 py-5 md:p-8 font-semibold text-sm md:text-base">
                    {row.feature}
                  </td>

                  <td className="text-center">
                    <Cell value={row.free} />
                  </td>

                  <td className="text-center">
                    <Cell value={row.pro} />
                  </td>

                  <td className="text-center">
                    <Cell value={row.growth} />
                  </td>

                  <td className="text-center">
                    <Cell value={row.premium} />
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      <p className="md:hidden text-center text-xs opacity-50 mt-3">
        ← Swipe horizontally →
      </p>

    </section>
  );
}