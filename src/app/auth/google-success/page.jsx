"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleSuccess() {
  const router = useRouter();

  useEffect(() => {
    const syncUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/google-sync`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success) {
          router.push(`/dashboard/${data.role}`);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.log(err);
        router.push("/login");
      }
    };

    syncUser();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Signing in...
    </div>
  );
}