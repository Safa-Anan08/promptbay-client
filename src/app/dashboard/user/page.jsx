import UserDashboard from "@/components/dashboard/user/UserDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function Page(){

return(

<ProtectedRoute role="user">
<UserDashboard/>

</ProtectedRoute>
);

}