"use client";

import Sidebar from "@/components/Sidebar";
import DashboardTabs from "@/components/layout/DashboardTabs";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({
  children,
}) {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="flex">
        <div className="hidden lg:block shrink-0">
          <Sidebar />
        </div>

        <div className="flex-1 min-w-0 overflow-x-hidden">
          {user && <DashboardTabs role={user.role} />}

          <main className="w-full min-w-0 px-3 py-4 sm:px-5 lg:px-8 xl:px-10 lg:py-8">
            {children}
          </main>
        </div>
      </div>
      
    </ProtectedRoute>
  );
}

