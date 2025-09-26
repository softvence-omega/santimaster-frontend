import ContainerWrapper from "../../utils/ContainerWrapper";
import ActivityTrendsSection from "./ActivityTrendsSection/ActivityTrendsSection";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import AdminOverview from "./AdminOverview/AdminOverview";
import DataExportManagement from "./DataExportManagement/DataExportManagement";
import PriorityReviewQueue from "./PriorityReviewQueue/PriorityReviewQueue";
import ResearchFundingOverview from "./ResearchFundingOverview/ResearchFundingOverview";
import UserManagement from "./UserManagement/UserManagement";

const AdminDashboard = () => {
  return (
    <ContainerWrapper>
      <AdminNavbar />
      <AdminOverview />
      <PriorityReviewQueue />
      <ActivityTrendsSection />
      <ResearchFundingOverview/>
      <UserManagement />
      <DataExportManagement />
    </ContainerWrapper>
  );
};

export default AdminDashboard;
