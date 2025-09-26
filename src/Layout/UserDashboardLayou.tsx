import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer/Footer";

// Main Layout Component
export default function UserDashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50  md:mt-5">
      {/* <Navbar /> */}
      <div className="">
        <Outlet></Outlet>
        <Footer />
      </div>
    </div>
  );
}
