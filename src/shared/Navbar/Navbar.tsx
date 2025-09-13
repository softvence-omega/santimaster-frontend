import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("MVP");
  const [menuOpen, setMenuOpen] = useState(false);

  const links = ["Home", "MVP", "Protocols", "Roadmap", "Roles", "Contact"];

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-white   ">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/*------------- Logo ------------------------*/}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </Link>

        {/* ----------Nav Links (Desktop)---------------- */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className={`relative text-green-900 hover:text-green-700 ${
                active === link ? "font-medium" : ""
              }`}
            >
              {link}
              {active === link && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-green-900 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/*------------- Search & Sign Up (Desktop) ----------------*/}
        <div className="hidden md:flex items-center space-x-3">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-sm w-28 md:w-40"
            />
          </div>
          <button className="!bg-green-900 text-white px-4 py-2 rounded-lg">
            Sign Up
          </button>
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

      {/*------------ Mobile Menu---------- */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4 flex flex-col space-y-4">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => {
                setActive(link);
                setMenuOpen(false);
              }}
              className={`text-left text-green-900 hover:text-green-700 ${
                active === link ? "font-medium underline" : ""
              }`}
            >
              {link}
            </button>
          ))}

          {/* Search + Sign Up (Mobile) */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-sm w-full"
            />
          </div>
          <button className="!bg-green-900 text-white px-4 py-2 rounded-lg transition">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
