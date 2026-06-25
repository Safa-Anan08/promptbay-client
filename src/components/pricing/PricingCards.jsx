"use client";

import { useAuth } from "@/context/AuthContext";
import {
  Sparkles,
  Crown,
  Rocket,
  ShieldCheck,
  BarChart3,
  Infinity,
  ArrowRight,
} from "lucide-react";

const plans = [
  {
    name: "pro",
    label: "PRO",
    price: "$9",
    duration: "month",
    icon: <Sparkles size={28} />,
    badge: "Most Popular",
    gradient: "from-violet-600 to-fuchsia-600",
    features: [
      "Unlimited prompt downloads",
      "Premium marketplace access",
      "Creator unlock",
      "Priority moderation",
    ],
  },
  {
    name: "growth",
    label: "GROWTH",
    price: "$25",
    duration: "3 months",
    icon: <BarChart3 size={28} />,
    badge: "Best Value",
    gradient: "from-cyan-600 to-blue-700",
    features: [
      "Everything in Pro",
      "Advanced analytics",
      "Growth dashboard",
      "Boost visibility",
      "Early features",
    ],
  },
  {
    name: "premium",
    label: "PREMIUM",
    price: "$99",
    duration: "year",
    icon: <Crown size={28} />,
    badge: "Ultimate",
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Everything unlocked",
      "Unlimited premium prompts",
      "VIP support",
      "Priority creator tools",
      "Advanced monetization",
      "Exclusive releases",
    ],
  },
];

export default function PricingCards() {
  const { user } = useAuth();

  const handleCheckout = async (plan) => {
    try {
      if (!user?.email) return alert("Login first");

      const res = await fetch("/api/checkout_session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, email: user.email }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className="relative rounded-[40px] border overflow-hidden group">
            <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-10 group-hover:opacity-20 transition`} />

            <div className="relative p-10">
              <div className="flex justify-between items-start">
                <div>
                  <div className="w-16 h-16 rounded-3xl bg-black text-white flex items-center justify-center">
                    {plan.icon}
                  </div>
                  <h2 className="text-4xl font-black mt-6">{plan.label}</h2>
                </div>

                <span className="px-4 py-2 rounded-full bg-black text-white text-sm">
                  {plan.badge}
                </span>
              </div>

              <div className="mt-10">
                <span className="text-7xl font-black">{plan.price}</span>
                <span className="opacity-60">/{plan.duration}</span>
              </div>

              <div className="mt-10 space-y-4">
                {plan.features.map((f) => (
                  <div key={f} className="flex gap-3 items-center">
                    <ShieldCheck className="text-emerald-500" size={18} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl bg-indigo-900 text-white p-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Infinity size={18} /> Unlimited Access
                  </div>
                  <div>100%</div>
                </div>
                <p className="mt-2 text-white/70 text-sm">
                  Premium performance with zero limits.
                </p>
              </div>

              <button
                onClick={() => handleCheckout(plan.name)}
                className="mt-8 w-full rounded-3xl py-4 bg-indigo-800 text-white font-bold flex justify-center items-center gap-2 hover:scale-[1.02] transition"
              >
                Choose Plan <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}