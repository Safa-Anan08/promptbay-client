"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { Calendar, CreditCard, Clock3, Crown } from "lucide-react";
import { MdOutlineAddToHomeScreen } from "react-icons/md";
import {
  FaMoneyBillTrendUp, FaRocket, FaCrown,
} from "react-icons/fa6";

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get(
          "/payments/history",
          {
            withCredentials: true,
          }
        );

        setPayments(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, []);

    return(
 <div className="space-y-6 sm:space-y-8">

  <div>
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3">
      Payment History
    </h1>

    <p className="opacity-60 mt-2 sm:mt-3 text-sm sm:text-base">
      Track all subscriptions and upgrades
    </p>
  </div>

  <div className="rounded-[28px] sm:rounded-[40px] border bg-card overflow-hidden">

    {payments.length === 0 ? (

      <div className="py-16 sm:py-24 px-6 flex flex-col items-center justify-center text-center">

        <Crown
          size={50}
          className="text-yellow-500"
        />

        <h2 className="text-2xl sm:text-3xl font-black mt-6">
          No Payments Yet
        </h2>

        <p className="opacity-60 mt-3 text-sm sm:text-base">
          Your payment history will appear here
        </p>

      </div>

    ) : (

      <>

        <div className="hidden lg:block overflow-x-auto">

          <table className="w-full min-w-[950px]">

            <thead>

              <tr className="border-b bg-muted/20">

                <th className="text-left p-7">
                  Date
                </th>

                <th className="text-left">
                  Plan
                </th>

                <th className="text-left">
                  Amount
                </th>

                <th className="text-left">
                  Duration
                </th>

                <th className="text-left">
                  Status
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
                    <div className="flex gap-3">

                      <Calendar size={18} />

                      {new Date(
                        item.createdAt
                      ).toLocaleDateString(
                        "en-GB"
                      )}

                    </div>
                  </td>

                  <td>

                    <div className="flex gap-3">

                      {item.plan === "free" &&
                        <MdOutlineAddToHomeScreen size={18} />}

                      {item.plan === "pro" &&
                        <Sparkles size={18} />}

                      {item.plan === "growth" &&
                        <FaMoneyBillTrendUp
                          size={18}
                          className="text-emerald-500"
                        />}

                      {item.plan === "premium" &&
                        <FaCrown
                          size={18}
                          className="text-yellow-500"
                        />}

                      <span className="uppercase font-black">
                        {item.plan}
                      </span>

                    </div>

                  </td>

                  <td>
                    <div className="flex gap-3 font-bold">
                      <CreditCard size={18} />
                      ${item.amount}
                    </div>
                  </td>

                  <td>
                    <div className="flex gap-3">
                      <Clock3 size={18} />
                      {item.durationDays} days
                    </div>
                  </td>

                  <td>

                    <span className="inline-flex rounded-full px-5 py-2 bg-emerald-500/10 text-emerald-600">

                      {item.status}

                    </span>

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
              className="rounded-[28px] border p-5"
            >

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-xs opacity-50">
                    Date
                  </p>

                  <div className="mt-1 flex gap-2 text-sm">

                    <Calendar size={16} />

                    {new Date(
                      item.createdAt
                    ).toLocaleDateString(
                      "en-GB"
                    )}

                  </div>

                </div>

                <span className="rounded-full px-3 py-1 text-xs bg-emerald-500/10 text-emerald-600">

                  {item.status}

                </span>

              </div>

              <div className="mt-5 flex items-center gap-2 font-black">

                {item.plan === "premium" &&
                  <FaCrown className="text-yellow-500" />}

                {item.plan === "growth" &&
                  <FaMoneyBillTrendUp className="text-emerald-500" />}

                {item.plan === "pro" &&
                  <Sparkles />}

                {item.plan === "free" &&
                  <MdOutlineAddToHomeScreen />}

                {item.plan}

              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">

                <div>

                  <p className="text-xs opacity-50">
                    Amount
                  </p>

                  <p className="font-bold">
                    ${item.amount}
                  </p>

                </div>

                <div>

                  <p className="text-xs opacity-50">
                    Duration
                  </p>

                  <p className="font-bold">
                    {item.durationDays} days
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
);}