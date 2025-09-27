import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("MVP");
  const [menuOpen, setMenuOpen] = useState(false);

  // const dispatch = useAppDispatch();
  // const currentUser = useAppSelector(selectCurrentUser);
  const links = [
    { name: "Home", path: "/" },
    { name: "MVP", path: "/mvp" },
    { name: "Protocols", path: "/protocol" },
    { name: "Roadmap", path: "/roadmap" },
    { name: "Roles", path: "/roles" },
    { name: "Contact", path: "/contract" },
  ];

  return (
    <div className="w-full p-2 fixed top-0 left-0 z-50">
      <div className="rounded-[12px] border border-black/25 bg-white shadow-[0_4px_15px_0_rgba(0,0,0,0.15)] backdrop-blur-[10px]">
        <div className="px-6 py-3 flex items-center justify-between">
          {/*------------- Logo ------------------------*/}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Logo"
              className="w-[156px] h-[73px] flex-shrink-0 aspect-[156/73]"
            />
          </Link>

          {/* ----------Nav Links (Desktop)---------------- */}
          <div className="hidden md:flex space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setActive(link.name)}
                className={`relative text-[#1D6953] text-center text-[18px] not-italic font-normal leading-normal hover:text-green-700 ${
                  active === link.name ? "font-medium" : ""
                }`}
              >
                {link.name}
                {active === link.name && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-green-900 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/*------------- Search & Sign Up (Desktop) ----------------*/}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="outline-none text-black text-sm w-28 md:w-40"
              />
            </div>
            <Link to={"/register"}>
              <button className="!bg-green-900 text-white px-4 py-2 rounded-lg">
                Sign Up
              </button>
            </Link>
          </div>

          {/*-------------- Hamburger Menu (Mobile + Tablet)------------------- */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="h-6 w-6 text-green-900" />
              ) : (
                <Menu className="h-6 w-6 text-green-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/*------------ Mobile Menu---------- */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4 flex flex-col space-y-4">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setActive(link.name)}
              className={`relative text-[#1D6953] text-center text-[18px] not-italic font-normal leading-normal hover:text-green-700 ${
                active === link.name ? "font-medium" : ""
              }`}
            >
              {link.name}
              {active === link.name && (
                <span className="absolute -bottom-1 left-0 w-fit h-[2px] bg-green-900 rounded-full" />
              )}
            </Link>
          ))}

          {/* Search Bar for Mobile */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-sm w-full"
            />
          </div>

          {/* Sign Up Button for Mobile */}
          <Link to={"/register"}>
            <button className="!bg-green-900 text-white px-4 py-2 rounded-lg transition cursor-pointer">
              Sign Up
            </button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
