import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer/Footer";
import UserDahboardTab from "../pages/UserDahsboard/userDasboardTab";
import UserNavbar from "../pages/UserDahsboard/UserNavbar/UserNavbar";

// Main Layout Component
export default function UserDashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50  md:mt-5">
      <div>
        <UserNavbar />

        <UserDahboardTab />

        <Outlet></Outlet>
        <Footer />
      </div>
    </div>
  );
}
