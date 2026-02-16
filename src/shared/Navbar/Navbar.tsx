import { Menu, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { logout } from "../../redux/features/auth/auth.slice";
import { useAppSelector } from "../../redux/hook";
import type { AppDispatch } from "../../redux/store";

const Navbar = () => {
  const [active, setActive] = useState("/");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const user = useAppSelector((state) => state?.auth?.user);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target as Node) &&
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    setMenuOpen(false);
    toast.success("Logged out successfully!");
    window.location.replace("/");
  };

  const handleDashboardRedirect = () => {
    setDropdownOpen(false);
    setMenuOpen(false);
    if (user?.role === "ADMIN") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "MVP", path: "/mvp" },
    { name: "Protocols", path: "/protocol" },
    { name: "Blogs", path: "/blog" },
    { name: "Roadmap", path: "/roadmap" },
    { name: "Roles", path: "/roles" },
    { name: "Contact", path: "/contract" },
  ];

  return (
    <div className="w-full p-0 fixed top-0 left-0 z-[500]">
      <div
        className={`shadow-[0_4px_15px_0_rgba(0,0,0,0.15)] transition-colors duration-300`}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          WebkitBackdropFilter: "blur(10px)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
          {/*------------- Logo ------------------------*/}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Logo"
              className="w-[120px] sm:w-[156px] h-auto flex-shrink-0"
            />
          </Link>

          {/* ----------Nav Links (Desktop: md and above)---------------- */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => {
                  setActive(link.name);
                  setDropdownOpen(false);
                }}
                className={`relative text-[#1D6953] text-[16px] sm:text-[18px] font-normal leading-normal hover:text-green-700 ${
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

          {/*------------- User/Auth (Desktop: md and above) ----------------*/}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="relative" ref={desktopDropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-100"
                  aria-label="User menu"
                  aria-expanded={dropdownOpen}
                >
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.fullName || "User"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-green-900" />
                  )}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {user?.fullName || "User"}
                    </div>
                    <button
                      onClick={handleDashboardRedirect}
                      className="w-full text-left px-4 py-2 text-sm text-[#1D6953] hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-green-900 text-white px-4 py-2 rounded-lg">
                  Sign Up
                </button>
              </Link>
            )}
          </div>

          {/*-------------- Hamburger Menu (Mobile: below md)------------------- */}
          <div className="md:hidden flex items-center space-x-3">
            {user ? (
              <div className="relative" ref={mobileDropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-100"
                  aria-label="User menu"
                  aria-expanded={dropdownOpen}
                >
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.fullName || "User"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-green-900" />
                  )}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {user?.fullName || "User"}
                    </div>
                    <button
                      onClick={handleDashboardRedirect}
                      className="w-full text-left px-4 py-2 text-sm text-[#1D6953] hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-green-900 text-white px-3 py-2 rounded-lg">
                  Sign Up
                </button>
              </Link>
            )}
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                setDropdownOpen(false);
              }}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="h-6 w-6 text-green-900" />
              ) : (
                <Menu className="h-6 w-6 text-green-900" />
              )}
            </button>
          </div>
        </div>

        {/*------------ Mobile Menu (below md)---------- */}
        <div
          className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${
            menuOpen
              ? "max-h-[500px] opacity-100 pointer-events-auto"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-4 sm:px-6 py-4 flex flex-col space-y-4">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => {
                  setActive(link.name);
                  setMenuOpen(false);
                }}
                className={`relative text-[#1D6953] text-center text-[16px] font-normal leading-normal hover:text-green-700 ${
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
