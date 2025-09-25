import ActivityTrendsSection from "./ActivityTrendsSection/ActivityTrendsSection";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import AdminOverview from "./AdminOverview/AdminOverview";
import DataExportManagement from "./DataExportManagement/DataExportManagement";
import PriorityReviewQueue from "./PriorityReviewQueue/PriorityReviewQueue";
import UserManagement from "./UserManagement/UserManagement";

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <AdminOverview />
      <PriorityReviewQueue/>
      <ActivityTrendsSection />
      <UserManagement />
      <DataExportManagement />
    </div>
  );
};

export default AdminDashboard;
