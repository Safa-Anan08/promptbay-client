"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { FaMoneyBillTrendUp, FaCrown, FaRocket } from "react-icons/fa6";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get("/admin/payments", {
          withCredentials: true,
        });

        setPayments(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, []);

  const icon = (plan) => {
    if (plan === "premium") {
      return <FaCrown className="text-yellow-500 text-xl" />;
    }

    if (plan === "growth") {
      return <FaRocket className="text-violet-500 text-xl" />;
    }

    return <FaMoneyBillTrendUp className="text-emerald-500 text-xl" />;
  };

  const badge = (plan) => {
    if (plan === "premium") {
      return "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-500";
    }

    if (plan === "growth") {
      return "bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-violet-500";
    }

    return "bg-emerald-500/20 text-emerald-500";
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-5xl font-black">
          Payment History
        </h1>

        <p className="mt-3 text-muted-foreground">
          Track subscriptions and revenue
        </p>
      </div>

      <div className="rounded-[28px] md:rounded-[40px] overflow-hidden border bg-card backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,.08)]">

  {payments.length === 0 ? (

    <div className="py-20 px-6 text-center">

      <h3 className="text-2xl md:text-3xl font-black">
        No Payments Found
      </h3>

      <p className="opacity-60 mt-2 text-sm md:text-base">
        Transactions will appear here
      </p>

    </div>

  ) : (

    <>
  

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-muted/20">

              <th className="p-7 text-left">
                User
              </th>

              <th>
                Plan
              </th>

              <th>
                Amount
              </th>

              <th>
                Duration
              </th>

              <th>
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {payments.map((item) => (

              <tr
                key={item._id}
                className="border-b hover:bg-muted/10 transition"
              >

                <td className="p-7">

                  <h3 className="font-bold">
                    {item.email}
                  </h3>

                  <p className="text-sm opacity-50">
                    Customer
                  </p>

                </td>

                <td>

                  <div className="flex justify-center">

                    <div
                      className={`flex items-center gap-3 rounded-full px-5 py-3 font-black uppercase ${badge(item.plan)}`}
                    >
                      {icon(item.plan)}
                      {item.plan}
                    </div>

                  </div>

                </td>

                <td className="text-center font-black text-xl">
                  ${item.amount}
                </td>

                <td className="text-center">

                  <div className="font-bold">
                    {item.durationDays} days
                  </div>

                  <div className="text-sm opacity-50">
                    access
                  </div>

                </td>

                <td className="text-center">

                  <div className="font-semibold">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString(
                      "en-GB"
                    )}
                  </div>

                  <div className="text-xs opacity-50">
                    Paid
                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

  

      <div className="grid gap-4 p-4 lg:hidden">

        {payments.map((item) => (

          <div
            key={item._id}
            className="rounded-3xl border p-5"
          >

            <div className="flex items-start justify-between gap-4">

              <div className="min-w-0">

                <h3 className="font-bold break-all">
                  {item.email}
                </h3>

                <p className="text-xs opacity-50">
                  Customer
                </p>

              </div>

              <div
                className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase ${badge(item.plan)}`}
              >
                {icon(item.plan)}

                {item.plan}

              </div>

            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">

              <div>

                <p className="text-xs opacity-50">
                  Amount
                </p>

                <p className="font-black">
                  ${item.amount}
                </p>

              </div>

              <div>

                <p className="text-xs opacity-50">
                  Duration
                </p>

                <p className="font-bold">
                  {item.durationDays}d
                </p>

              </div>

              <div>

                <p className="text-xs opacity-50">
                  Date
                </p>

                <p className="font-semibold text-xs">
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString(
                    "en-GB"
                  )}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </>
  )}

</div>
    </div>
  );
}