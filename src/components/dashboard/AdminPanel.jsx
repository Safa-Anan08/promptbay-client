"use client";

import { Users, Clock, CheckCircle, XCircle } from "lucide-react";

export default function AdminPanel() {
  const cards = [
    { title: "Users", value: "4,892", icon: Users },
    { title: "Pending", value: "128", icon: Clock },
    { title: "Approved", value: "832", icon: CheckCircle },
    { title: "Rejected", value: "41", icon: XCircle },
  ];

  return (
    <div>
      <h2 className="text-4xl font-black mb-8">Admin Overview</h2>

      <div className="grid lg:grid-cols-4 gap-6">
        {cards.map((item) => (
          <div key={item.title} className="rounded-[30px] border p-8">
            <item.icon className="mb-5" />
            <h3 className="text-lg">{item.title}</h3>
            <p className="text-5xl font-black mt-3">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}