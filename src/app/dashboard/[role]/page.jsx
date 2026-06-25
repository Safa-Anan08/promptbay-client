import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AdminPanel from "@/components/dashboard/AdminPanel";
import CreatorPanel from "@/components/dashboard/CreatorPanel";

export default async function Page({ params }) {
  const role = (await params).role;

  return (
    <div className="flex">
      <DashboardSidebar role={role} />

      <div className="flex-1 p-10">
        <DashboardHeader />

        {role === "admin" && <AdminPanel />}

        {role === "creator" && <CreatorPanel />}

        {role === "user" && <UserPanel />}
      </div>
    </div>
  );
}