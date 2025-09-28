import { Search, Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Bannerimg from "../../../assets/Homeimg/Bannerimg.png";
import VirusImg from "../../../assets/Homeimg/virus.png";
import menicon from "../../../assets/icon/men.svg";
import uploadicon from "../../../assets/icon/upload.svg";
import logo from "../../../assets/logo.png";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { logout } from "../../../redux/features/auth/auth.slice";
import { useAppSelector } from "../../../redux/hook";

export default function Banner() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Separate refs for desktop and mobile
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const user = useAppSelector((state) => state?.auth?.user);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (desktopDropdownRef.current &&
          !desktopDropdownRef.current.contains(event.target as Node)) &&
        (mobileDropdownRef.current &&
          !mobileDropdownRef.current.contains(event.target as Node))
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
    setMenuOpen(false);
    navigate("/login");
    console.log("hello");
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "MVP", path: "/mvp" },
    { name: "Protocols", path: "/protocol" },
    { name: "Roadmap", path: "/roadmap" },
    { name: "Roles", path: "/roles" },
    { name: "Contact", path: "/contract" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={Bannerimg}
          alt="DNA Background"
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="absolute inset-0 rounded-lg border-b-2 border-[#1D6953]"></div>

      {/*------------- Header Navbar -------------------*/}
      <header className="relative z-20 px-4 sm:px-6 py-6">
        <div className="rounded-[12px] border border-black/25 bg-white shadow-[0_4px_15px_0_rgba(0,0,0,0.15)] backdrop-blur-[10px]">
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={logo}
                alt="Logo"
                className="w-[120px] sm:w-[156px] h-auto flex-shrink-0"
              />
            </Link>

            {/* Nav Links (Desktop) */}
            <div className="hidden lg:flex space-x-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => {
                    setActive(link.name);
                    setDropdownOpen(false);
                  }}
                  className={`relative text-[#1D6953] text-center text-[16px] sm:text-[18px] font-normal leading-normal hover:text-green-700 ${
                    active === link.name ? "font-medium" : ""
                  }`}
                >
                  {link.name}
                  {active === link.name && (
                    <span className="absolute left-0 right-0 bottom-[-2px] rounded-lg border-b-2 border-[#1D6953]" />
                  )}
                </Link>
              ))}
            </div>

            {/* Search + Auth Section (Desktop) */}
            <div className="hidden lg:flex items-center space-x-3 relative">
              {/* Search */}
              <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2">
                <Search className="h-4 w-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none text-black text-sm w-28 sm:w-40"
                />
              </div>

              {/* Auth Section */}
              {user ? (
                <div className="relative" ref={desktopDropdownRef}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen((prev) => !prev);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    <User className="h-5 w-5 text-green-900" />
                    <span className="text-[#1D6953] text-sm hidden sm:inline">
                      {user?.fullName || "User"}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 border border-gray-200 rounded-lg shadow-lg !z-50">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        {user?.fullName || "User"}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/register">
                  <button className="bg-green-900 text-white px-4 py-2 rounded-lg cursor-pointer">
                    Sign Up
                  </button>
                </Link>
              )}
            </div>

            {/* Hamburger (Mobile) */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  setDropdownOpen(false);
                }}
              >
                {menuOpen ? (
                  <X className="h-6 w-6 text-green-900" />
                ) : (
                  <Menu className="h-6 w-6 text-green-900" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${
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
                  className={`text-[#1D6953] text-center text-[16px] font-normal leading-normal hover:text-green-700 ${
                    active === link.name ? "font-medium" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Search */}
              <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2">
                <Search className="h-4 w-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none text-black text-sm w-full"
                />
              </div>

              {/* Auth (Mobile) */}
              {user ? (
                <div className="relative" ref={mobileDropdownRef}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen((prev) => !prev);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 w-full"
                  >
                    <User className="h-5 w-5 text-green-900" />
                    <span className="text-[#1D6953]">
                      {user?.fullName || "User"}
                    </span>
                  </button>
                  {dropdownOpen && (
                    <div className="mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/register">
                  <button className="bg-green-900 text-white px-4 py-2 rounded-lg w-full">
                    Sign Up
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ------------------ Main Section ------------------- */}
      <main className="relative z-10 px-4 sm:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <h1 className="text-[40px] sm:text-[60px] lg:text-[70px] font-bold leading-tight text-[#F5F5F7]">
                Open, Peer Reviewed Gene Editing Protocols
              </h1>
              <p className="text-[16px] sm:text-[18px] leading-[140%]">
                Search rigorously reviewed methods, submit your own, and
                accelerate CRISPR, CAR-T, and AI-designed mRNA research.
              </p>

              {/* Buttons */}
              <div className="grid sm:flex gap-4 mt-6 sm:mt-8">
                <Link
                  to="/gene-application"
                  className="flex justify-center items-center gap-[10px] px-[20px] sm:px-[28px] py-[12px] sm:py-[16px] rounded-[8px] bg-[#17AA80] text-white hover:bg-[#13996F]"
                >
                  <img src={menicon} alt="Join Icon" className="w-5 h-5" />
                  Apply to Join
                </Link>
                <Link
                  to="/submit-protocol"
                  className="flex justify-center items-center gap-[10px] px-[20px] sm:px-[28px] py-[12px] sm:py-[16px] rounded-[8px] border border-[#17AA80] text-[#17AA80] hover:bg-[#17AA80] hover:text-white"
                >
                  <img
                    src={uploadicon}
                    alt="Protocol Icon"
                    className="w-5 h-5"
                  />
                  Submit a Protocol
                </Link>
              </div>
            </div>
          </div>
          {/* Virus Image */}
          <div className="mt-8 sm:mt-12 lg:mt-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 mx-auto lg:mx-0">
            <img
              src={VirusImg}
              alt="Virus Illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
