"use client";

import {
  FileText,
  ShoppingCart,
  DollarSign,
  Star,
  TrendingUp,
} from "lucide-react";

export default function CreatorStats() {
  const cards = [
    {
      title: "Total Prompts",
      value: "24",
      icon: <FileText size={22} />,
      color: "from-violet-500 to-fuchsia-500",
      change: "+8.4%",
    },
    {
      title: "Total Sales",
      value: "1,234",
      icon: <ShoppingCart size={22} />,
      color: "from-purple-500 to-indigo-500",
      change: "+12.8%",
    },
    {
      title: "Total Income",
      value: "$3,456",
      icon: <DollarSign size={22} />,
      color: "from-emerald-500 to-green-500",
      change: "+18.2%",
    },
    {
      title: "Avg Rating",
      value: "4.8",
      icon: <Star size={22} />,
      color: "from-amber-500 to-yellow-400",
      change: "+0.4",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="glass-card rounded-2xl sm:rounded-[28px] border border-border p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_20px_60px_rgba(16,185,129,.12)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div
              className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-r ${card.color} text-white shadow-lg shrink-0`}
            >
              {card.icon}
            </div>

            <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-emerald-500">
              <TrendingUp size={14} />
              {card.change}
            </div>
          </div>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-muted-foreground">
            {card.title}
          </p>

          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black break-words">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}