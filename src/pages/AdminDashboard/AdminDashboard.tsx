import { useGetAdminDashboardQuery } from "../../redux/features/admindashboard/admindashboard";
import ContainerWrapper from "../../utils/ContainerWrapper";
import ActivityTrendsSection from "./ActivityTrendsSection/ActivityTrendsSection";

import AdminOverview from "./AdminOverview/AdminOverview";
import DataExportManagement from "./DataExportManagement/DataExportManagement";
import PriorityReviewQueue from "./PriorityReviewQueue/PriorityReviewQueue";
import ResearchFundingOverview from "./ResearchFundingOverview/ResearchFundingOverview";
import UserManagement from "./UserManagement/UserManagement";

const AdminDashboard = () => {
  const { data: adminDashboard, isLoading } = useGetAdminDashboardQuery();

  return (
    <ContainerWrapper>
      {/* <AdminNavbar /> */}
      {/* Pass data as props if needed */}
      <AdminOverview
        isLoading={isLoading}
        overview={adminDashboard?.data.overview}
      />
      <PriorityReviewQueue
        isLoading={isLoading}
        pendingProtocol={adminDashboard?.data.pendingProtocol}
      />
      <ActivityTrendsSection
        recentActivity={adminDashboard?.data.recentActivity}
      />
      <ResearchFundingOverview />
      <UserManagement
        users={adminDashboard?.data.users?.map((user) => ({
          id: user._id,
          name: user.fullName,
          email: user.email,
          role: user.role,
          status: user.accountStatus,
          lastLogin: user.lastLoginTime || "Never",
          submissions: 0,
        }))}
      />
      <DataExportManagement />
    </ContainerWrapper>
  );
};

export default AdminDashboard;
