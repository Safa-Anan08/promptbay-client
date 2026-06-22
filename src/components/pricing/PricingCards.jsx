"use client";

import { useAuth } from "@/context/AuthContext";

const plans = [
  {
    name: "pro",
    label: "PRO",
    price: "$9",
    features: [
      "Unlimited prompts",
      "Premium prompts",
    ],
  },
  {
    name: "growth",
    label: "GROWTH",
    price: "$90",
    features: [
      "Everything",
      "Analytics",
    ],
  },
];

export default function PricingCards() {
  const { user } = useAuth();

  const handleCheckout = async (plan) => {
    try {
      if (!user?.email) {
        alert("Login first");
        return;
      }

      const res = await fetch("/api/checkout_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
          email: user?.email,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className="rounded-[40px] p-10 border"
        >
          <h2 className="text-3xl font-black">
            {plan.label}
          </h2>

          <h1 className="text-7xl font-black mt-5">
            {plan.price}
          </h1>

          <div className="space-y-4 mt-10">
            {plan.features.map((feature) => (
              <p key={feature}>✓ {feature}</p>
            ))}
          </div>

          <button
            onClick={() => handleCheckout(plan.name)}
            className="mt-10 w-full rounded-2xl py-4 bg-black text-white"
          >
            Choose
          </button>
        </div>
      ))}
    </div>
  );
}