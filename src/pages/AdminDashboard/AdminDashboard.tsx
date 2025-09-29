import { useGetAdminDashboardQuery } from "../../redux/admindashboard/admindashboard";
import ContainerWrapper from "../../utils/ContainerWrapper";
import ActivityTrendsSection from "./ActivityTrendsSection/ActivityTrendsSection";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import AdminOverview from "./AdminOverview/AdminOverview";
import DataExportManagement from "./DataExportManagement/DataExportManagement";
import PriorityReviewQueue from "./PriorityReviewQueue/PriorityReviewQueue";
import ResearchFundingOverview from "./ResearchFundingOverview/ResearchFundingOverview";
import UserManagement from "./UserManagement/UserManagement";

const AdminDashboard = () => {
  // Correct usage: use object destructuring
  const { data: adminDashboard, isLoading, error } = useGetAdminDashboardQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading dashboard</p>;

  return (
    <ContainerWrapper>
      <AdminNavbar />
      {/* Pass data as props if needed */}
      <AdminOverview overview={adminDashboard?.data.overview} />
      <PriorityReviewQueue pendingProtocol={adminDashboard?.data.pendingProtocol} />
      <ActivityTrendsSection recentActivity={adminDashboard?.data.recentActivity} />
      <ResearchFundingOverview donation={adminDashboard?.data.donation} />
      <UserManagement users={adminDashboard?.data.users?.map(user => ({
        id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
        status: user.accountStatus,
        lastLogin: user.lastLoginTime || 'Never',
        submissions: 0 
      }))} />
      <DataExportManagement />
    </ContainerWrapper>
  );
};

export default AdminDashboard;
