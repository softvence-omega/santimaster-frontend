import { Outlet, useLocation } from "react-router-dom";
import Footer from "../shared/Footer/Footer";
import Navbar from "../shared/Navbar/Navbar";
import ScrollToTop from "../utils/ScrollTop";

const Mainlayout = () => {
  const location = useLocation();

  // check if current route is homepage
  const isHomePage = location.pathname === "/";

  return (
    <div>
      {!isHomePage && <Navbar />}
      <ScrollToTop />
      <Outlet />

      <Footer />
    </div>
  );
};

export default Mainlayout;
