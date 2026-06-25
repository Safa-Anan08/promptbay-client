import DashboardStats from "@/components/dashboard/admin/DashboardStats";
import AnalyticsCharts from "@/components/dashboard/admin/AnalyticsCharts";
import NewUsers from "@/components/dashboard/admin/NewUsers";
import TopCreators from "@/components/dashboard/admin/TopCreators";
import PromptStatusChart from "@/components/dashboard/admin/PromptStatusChart";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function Page(){

  return(
  <ProtectedRoute role="admin">
  <div>

  <h1 className="text-6xl font-bold mb-10">
     Admin Dashboard
    </h1>

   <DashboardStats/>

  <div className="mt-8">
     <AnalyticsCharts />
   </div>
    <PromptStatusChart/>
  <div >
     <TopCreators />
      <NewUsers />
    </div>
</div>
</ProtectedRoute>
);

}