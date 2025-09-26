import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Send,
  ListChecks,
  Settings,
} from "lucide-react";
import logo from "../../../assets/logo.png";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/overview", label: "Overview", icon: LayoutDashboard },
    { to: "/my-drafts", label: "My Drafts", icon: FileText },
    { to: "/submitted", label: "Submitted", icon: Send },
    { to: "/review-queue", label: "Review Queue", icon: ListChecks },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="w-full  ">
      {/* Top Bar */}
      <div className=" flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
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
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search users..."
          />
        </div>

        {/* Profile + Mobile Toggle */}
        <div className="flex items-center space-x-4">
          {/* User Profile */}
          <div className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
            <span className="font-medium text-gray-700">U</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search on Mobile */}
      <div className="md:hidden px-4 pb-3">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search users..."
        />
      </div>

      {/* Navigation */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block rounded-xl border border-black/25 
    bg-white shadow-md backdrop-blur-md`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-center lg:gap-10 gap-4 py-4">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                className="flex items-center lg:gap-2 sm:gp-2 text-gray-700 hover:text-green-600 text-sm sm:text-base transition"
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
