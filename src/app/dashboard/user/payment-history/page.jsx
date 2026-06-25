"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { Calendar, CreditCard, Clock3, Crown } from "lucide-react";
import { MdOutlineAddToHomeScreen } from "react-icons/md";
import {
  FaMoneyBillTrendUp,
  FaRocket,
  FaCrown,
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
 <div className="space-y-8">
 <div>
  <h1 className="text-5xl font-black mt-3">
    Payment History
  </h1>

  <p className="opacity-60 mt-3">
    Track all subscriptions and upgrades
  </p>
</div>

  <div className=" rounded-[40px] border bg-card overflow-hidden">
     {payments.length===0  ?
          (
            <div className="py-24 flex flex-col items-center justify-center">
  <Crown
    size={60}
    className="text-yellow-500"
  />

  <h2 className="text-3xl font-black mt-6">
    No Payments Yet
  </h2>

  <p className="opacity-60 mt-3">
    Your payment history will appear here
  </p>
</div>

    ) :
  (
   <table className="w-full">
    <thead>
  <tr className="border-b bg-muted/20">
    <th className="text-left p-7 font-semibold">
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
    {payments.map((item)=>(
       <tr
  key={item._id}
  className="border-b hover:bg-muted/10 transition"
>
  <td className="p-7">
    <div className="flex items-center gap-3">
      <Calendar size={18} />
      {new Date(item.createdAt).toLocaleDateString("en-GB")}
    </div>
  </td>

  <td>
    <div className="flex items-center gap-3">
      {item.plan === "free" && (
        <MdOutlineAddToHomeScreen
          size={18}
          className="text-gray-500"
        />
      )}

      {item.plan === "pro" && (
        <Sparkles
          size={18}
          className="text-gray-500"
        />
      )}

      {item.plan === "growth" && (
        <FaMoneyBillTrendUp
          size={18}
          className="text-emerald-500"
        />
      )}

      {item.plan === "premium" && (
        <FaCrown
          size={18}
          className="text-yellow-500"
        />
      )}

      <span className="uppercase font-black">
        {item.plan}
      </span>
    </div>
  </td>

  <td>
    <div className="flex items-center gap-3 font-bold">
      <CreditCard size={18} />
      ${item.amount}
    </div>
  </td>

  <td>
    <div className="flex items-center gap-3">
      <Clock3 size={18} />
      {item.durationDays} days
    </div>
  </td>

  <td>
    <span className="inline-flex rounded-full px-5 py-2 bg-emerald-500/10 text-emerald-600 font-semibold">
      {item.status}
    </span>
  </td>
</tr> 

  ))}
   </tbody>
  </table>
)}
 </div>

   </div>
);}