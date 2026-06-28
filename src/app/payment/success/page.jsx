"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axios";

function SuccessContent() {
  const router = useRouter();
  const search = useSearchParams();

  useEffect(() => {
    const sessionId = search.get("session_id");

    const confirmPayment = async () => {
      if (!sessionId) return;

      try {
        await axiosInstance.get(
          `/payments/success/${sessionId}`
        );

        window.location.href = "/dashboard/profile";
      } catch (err) {
        console.log(err);
        alert("Invalid payment");
      }
    };

    confirmPayment();
  }, [search, router]);

  return (
    <div className="p-10">
      Activating subscription.....
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="p-10">
          Loading...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}