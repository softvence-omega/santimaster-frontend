import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../../assets/logo.png";
import { useAppSelector } from "../../../redux/hook";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { logout } from "../../../redux/features/auth/auth.slice";
import { toast } from "react-hot-toast";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setDropdownOpen(false);
    setIsOpen(false);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  // Get user initials if no profileImage is available
  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    return names
      .map((n) => n.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8 bg-white border-b border-gray-200 shadow-sm">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="w-[120px] sm:w-[156px] h-auto object-contain"
          />
        </Link>

        {/* Search (hidden on mobile) */}
        <div className="hidden md:block w-full max-w-xs">
          {/* <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Search users..."
          /> */}
        </div>

        {/* Profile + Mobile Toggle */}
        <div className="flex items-center space-x-3">
          {/* User Profile */}
          {user ? (
            <div className="relative" ref={desktopDropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                aria-label="User menu"
                aria-expanded={dropdownOpen}
              >
                {user.profileImage ? (
                  <img
                    src={user?.profileImage}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
                    <span className="font-medium text-gray-700">
                      {getInitials(
                        user.fullName || user.fullName || user.email
                      )}
                    </span>
                  </div>
                )}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    {user.fullName || user.fullName || user.email || "User"}
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
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search on Mobile */}
      <div className="md:hidden px-4 py-3">
        {/* <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="Search users..."
        /> */}
      </div>
    </nav>
  );
};

export default UserNavbar;
