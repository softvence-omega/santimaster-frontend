import { Search } from "lucide-react";

import { Link } from "react-router-dom";
import Bannerimg from "../../../assets/Homeimg/Bannerimg.png";
import VirusImg from "../../../assets/Homeimg/virus.png";
import menicon from "../../../assets/icon/men.svg";
import uploadicon from "../../../assets/icon/upload.svg";
import { Menu, X } from "lucide-react";
import logo from "../../../assets/logo.png";
import { useState } from "react";

export default function HomePage() {
  const [active, setActive] = useState("MVP");
  const [menuOpen, setMenuOpen] = useState(false);

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
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src={Bannerimg}
          alt="DNA Background"
          className="object-cover object-center w-full h-full"
        />
        {/*-------------------- Dark overlay for readability ----------------------------*/}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* ----------------------Background Effects -----------------------------*/}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>

      {/*------------- Header Navbar now -------------------*/}
      <header className="relative z-10 px-6 py-6 ">
        <div className=" rounded-[12px] border border-black/25 bg-white shadow-[0_4px_15px_0_rgba(0,0,0,0.15)] backdrop-blur-[10px]  ">
          <div className="  px-6 py-3 flex items-center justify-between">
            {/*------------- Logo ------------------------*/}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={logo}
                alt="Logo"
                className="w-[156px] h-[73px] flex-shrink-0 aspect-[156/73]"
              />
            </Link>

            {/* ----------Nav Links (Desktop)---------------- */}
            <div className="hidden lg:flex space-x-6">
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
            <div className="hidden lg:flex items-center space-x-3">
              <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 ">
                <Search className="h-4 w-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none text-black text-sm w-28 md:w-40"
                />
              </div>
              <Link to={"/register"}>
                <button className="!bg-green-900 text-white px-4 py-2 rounded-lg cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </div>

            {/*-------------- Hamburger Menu (Mobile + Tablet)------------------- */}
            <div className="lg:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? (
                  <X className="h-6 w-6 text-green-900" />
                ) : (
                  <Menu className="h-6 w-6 text-green-900" />
                )}
              </button>
            </div>
          </div>

          {/*------------ Mobile Menu---------- */}
          <div
            className={`lg:hidden bg-white border-t border-gray-200 transition-all duration-300 overflow-hidden ${
              menuOpen
                ? "max-h-screen opacity-100 pointer-events-auto"
                : "max-h-0 opacity-0 pointer-events-none"
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
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-green-900 rounded-full" />
                  )}
                </Link>
              ))}

              {/* Search + Sign Up (Mobile) */}
              <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2">
                <Search className="h-4 w-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none text-black text-sm w-28 md:w-40"
                />
              </div>
              <Link to={"/register"}>
                <button className="!bg-green-900 text-white px-4 py-2 rounded-lg transition cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/*---------------------------- Main Content -------------------------------------*/}
      <main className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-[color:var(--Neutral,#F5F5F7)] font-barlow text-[70px] not-italic font-bold leading-[90px]">
                  Open, Peer Reviewed Gene Editing Protocols
                </h1>
                <p className="text-xl t text-[20px] not-italic font-normal leading-[140%]">
                  Search rigorously reviewed methods, submit your own, and
                  accelerate CRISPR, CAR-T, and AI-designed mRNA research.
                </p>
              </div>

              {/*------------- Buttons with Icons ------------------*/}
              <div className="grid md:flex  lg:flex gap-4 mt-8">
                <Link
                  to="/apply"
                  className="flex justify-center items-center gap-[10px] px-[28px] py-[16px] rounded-[8px] bg-[#17AA80] text-white font-normal transition duration-300 hover:bg-[#13996F]"
                >
                  <img src={menicon} alt="Join Icon" className="w-5 h-5" />
                  Apply to Join
                </Link>

                <Link
                  to="/submit"
                  className="flex justify-center items-center gap-[10px] px-[28px] py-[16px] rounded-[8px] border border-[#17AA80] text-[#17AA80] hover:bg-[#17AA80] hover:text-white font-normal transition duration-300"
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
          {/* virus image Bottom Left Virus Cell */}
          <div className="  bottom-0 P-4 w-64 h-64 lg:w-80 lg:h-80">
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
