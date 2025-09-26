import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
