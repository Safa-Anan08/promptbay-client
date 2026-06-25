"use client";

import { Check, X, Sparkles, Rocket, Crown } from "lucide-react";

const rows = [
  { feature: "Prompt Limit", free: "3 / day", pro: "Unlimited", growth: "Unlimited", premium: "Unlimited" },
  { feature: "Premium Prompts", free: false, pro: true, growth: true, premium: true },
  { feature: "Creator Tools", free: false, pro: true, growth: true, premium: true },
  { feature: "Analytics", free: false, pro: false, growth: true, premium: true },
  { feature: "Priority Support", free: false, pro: false, growth: true, premium: true },
  { feature: "Exclusive Releases", free: false, pro: false, growth: false, premium: true },
];

function Cell({ value }) {
  if (value === true) return <div className="flex justify-center"><Check className="text-emerald-500" size={24} /></div>;
  if (value === false) return <div className="flex justify-center"><X className="text-red-500" size={22} /></div>;
  return <span className="font-semibold">{value}</span>;
}

export default function ComparisonTable() {
  return (
    <div className="mt-32">
      <div className="text-center mb-12">
        <div className="inline-flex gap-2 items-center px-5 py-2 rounded-full bg-violet-500/10">
          <Sparkles size={18} /> Compare Plans
        </div>
        <h2 className="text-5xl font-black mt-6">Everything Included</h2>
        <p className="opacity-60 mt-3">Choose the level that fits your workflow</p>
      </div>

      <div className="rounded-[40px] overflow-hidden border backdrop-blur-xl">
        <table className="w-full">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-8 text-left">Feature</th>
              <th>Free</th>
              <th className="bg-gradient-to-r from-violet-600 to-fuchsia-600">
                <div className="flex justify-center gap-2"><Rocket size={18} /> Pro</div>
              </th>
              <th className="bg-gradient-to-r from-cyan-600 to-blue-700">Growth</th>
              <th className="bg-gradient-to-r from-yellow-500 to-orange-500">
                <div className="flex justify-center gap-2"><Crown size={18} /> Premium</div>
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.feature}
                className={`border-b hover:bg-white/5 transition ${index % 2 === 0 ? "bg-muted/20" : ""}`}
              >
                <td className="p-8 font-semibold">{row.feature}</td>
                <td className="text-center"><Cell value={row.free} /></td>
                <td className="text-center"><Cell value={row.pro} /></td>
                <td className="text-center"><Cell value={row.growth} /></td>
                <td className="text-center"><Cell value={row.premium} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}