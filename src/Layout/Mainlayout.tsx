import { Outlet } from "react-router-dom";

import Footer from "../shared/Footer/Footer";

const Mainlayout = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Mainlayout;
