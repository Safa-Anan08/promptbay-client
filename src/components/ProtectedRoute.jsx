"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert, LoaderCircle } from "lucide-react";

export default function ProtectedRoute({
  children,
  role,
}) {

  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {

    if (loading) return;

    if (!user) {

      router.replace("/login");

      return;

    }

    if (role && user.role !== role) {

      const timer = setTimeout(() => {

        router.replace("/");

      }, 3000);

      return () => clearTimeout(timer);

    }

  }, [loading, user, role, router]);

  if (loading) {

    return (

      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-xl">

        <div className="glass-card w-[360px] rounded-[36px] p-10 text-center shadow-2xl">

          <LoaderCircle
            size={64}
            className="mx-auto animate-spin text-emerald-500"
          />

          <h2 className="mt-6 text-3xl font-black">

            Checking Access...

          </h2>

          <p className="mt-3 text-muted-foreground">

            Please wait a moment.

          </p>

        </div>

      </div>

    );

  }

  if (!user) return null;

  if (role && user.role !== role) {

    return (

      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-xl">
        <div className="glass-card w-[420px] rounded-[36px] p-10 text-center shadow-2xl">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10">
            <ShieldAlert
              size={52}
              className="text-red-500"
            />
          </div>
          <h2 className="mt-8 text-4xl font-black">

            Oops!

          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            You don't have permission to access this page.
            <br />

            Redirecting to Home...

          </p>

        </div>

      </div>

    );

  }

  return children;

}