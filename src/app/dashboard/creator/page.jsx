import CreatorStats from "@/components/dashboard/creator/CreatorStats";
import CreatorAnalytics from "@/components/dashboard/creator/CreatorAnalytics";
import SalesCategoryChart from "@/components/dashboard/creator/SalesCategoryChart";
import MyPromptsTable from "@/components/dashboard/creator/MyPromptsTable";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute role="creator">
      <div className="w-full min-w-0 space-y-6 sm:space-y-8 lg:space-y-10">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black">
          Creator Dashboard
        </h1>
        <CreatorStats />
        <CreatorAnalytics />
       <SalesCategoryChart />
       <MyPromptsTable />
      </div>
    </ProtectedRoute>
  );
}