import { Outlet } from "react-router-dom";


const AdminDashboardLayout = () => {
  return (
     <div className="min-h-screen bg-gray-50  md:mt-5">
      {/* <Navbar /> */}
      <div className="grid grid-cols-12 ">
        <div className=" col-span-2 "></div>
        <div className=" col-span-10">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardLayout;
