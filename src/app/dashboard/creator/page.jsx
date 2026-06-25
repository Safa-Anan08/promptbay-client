import CreatorStats from "@/components/dashboard/creator/CreatorStats";
import CreatorAnalytics from "@/components/dashboard/creator/CreatorAnalytics";
import SalesCategoryChart from "@/components/dashboard/creator/SalesCategoryChart";
import MyPromptsTable from "@/components/dashboard/creator/MyPromptsTable";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function Page(){

   return(
     <ProtectedRoute role="creator">
    <div >
    <h1 className="text-6xl font-black mb-10">
        Creator Dashboard</h1>
    <CreatorStats/>
   <div className="mt-10">
    <CreatorAnalytics/>
    </div>
   <div className="mt-10">
   <SalesCategoryChart/></div>
   <div className="mt-10">
   <MyPromptsTable/></div>
    </div>
    </ProtectedRoute>
);
}