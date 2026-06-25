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
        <div className="hidden lg:block">
          <Sidebar />
        </div>


        <div className="flex-1">

          {user && (
            <DashboardTabs role={user.role} />
          )}

          <div className="p-6 lg:p-10">
            {children}
          </div>

        </div>

      </div>
    </ProtectedRoute>
  );
}