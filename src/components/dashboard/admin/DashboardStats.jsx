"use client";

import {
  Users,
  UserCheck,
  FileText,
  DollarSign,
  TrendingUp,
} from "lucide-react";

export default function DashboardStats() {
  const cards = [
    {
      title: "Total Users",
      value: "12,345",
      change: "+12.5%",
      icon: <Users size={24} />,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Total Creators",
      value: "2,345",
      change: "+8.2%",
      icon: <UserCheck size={24} />,
      color: "from-fuchsia-500 to-purple-500",
    },
    {
      title: "Total Prompts",
      value: "8,765",
      change: "+15.3%",
      icon: <FileText size={24} />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Total Revenue",
      value: "$24,680",
      change: "+21.5%",
      icon: <DollarSign size={24} />,
      color: "from-emerald-500 to-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className=" glass-card  rounded-[28px]  p-6  border  border-border  hover:-translate-y-2  duration-300  ">
          <div className="flex items-start justify-between">

            <div
              className={` w-14  h-14  rounded-2xl  flex  items-center  justify-center  bg-gradient-to-r  ${card.color}  text-white  shadow-lg  `}
            >
              {card.icon}
            </div>

            <div className="flex items-center gap-1 text-emerald-500 text-sm font-semibold">
              <TrendingUp size={15} />
              {card.change}
            </div>

          </div>

          <p className="mt-6 text-sm text-muted">
            {card.title}
          </p>

          <h2 className="mt-2 text-4xl font-black">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}