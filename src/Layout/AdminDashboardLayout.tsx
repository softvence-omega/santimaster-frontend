import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer/Footer";
import AdminDahboardTab from "../pages/AdminDashboard/AdminTabs";
import AdminNavbar from "../pages/AdminDashboard/AdminNavbar/AdminNavbar";

const AdminDashboardLayout = () => {
  return (
    <div className="min-h-screen md:mt-5">
      <div className="">
        <AdminNavbar />
        <AdminDahboardTab />
        <Outlet></Outlet>
        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
