import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../../assets/logo.png";
import toast from "react-hot-toast";
import { useAppSelector } from "../../../redux/hook";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { logout } from "../../../redux/features/auth/auth.slice";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state?.auth?.user);

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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setDropdownOpen(false);
    setIsOpen(false);
    toast.success("Logged out successfully!");
    navigate("/login");
  };



  return (
    <nav className="w-full max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="w-[120px] sm:w-[156px] h-auto object-contain"
          />
        </Link>

        {/* Profile + Mobile Toggle */}
        <div className="flex items-center space-x-4">
          {/* User Dropdown (desktop) */}
          {user ? (
            <div className="relative" ref={desktopDropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center hover:bg-gray-300"
                aria-label="User menu"
                aria-expanded={dropdownOpen}
              >
                <span className="font-medium text-gray-700">
                  {user?.fullName?.charAt(0) || "U"}
                </span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    {user?.fullName || "User"}
                  </div>

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
                Sign In
              </button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => {
              setIsOpen(!isOpen);
              setDropdownOpen(false);
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search on Mobile */}
      <div className="md:hidden px-4 pb-3">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search users..."
        />
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block rounded-xl border border-black/25 bg-white shadow-md backdrop-blur-md`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
