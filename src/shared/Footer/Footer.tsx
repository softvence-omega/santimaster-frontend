"use client";

import { useState } from "react";
import {
  Mail,
  Users,
  Lightbulb,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import SectionHeader from "../../utils/SectionHeading";
import backgroundfooter from "../../assets/Homeimg/footer-ragtangle.png";
import logo from "../../assets/logo/whitelogo.png";
const Footer = () => {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-4 py-12">
        <SectionHeader
          title="Stay Updated"
          subtitle="Get the latest protocols, research insights, and community updates delivered to your inbox"
        />
      </div>
      <div className="  relative border border-white">
        {/* Main Newsletter Section */}
        <div className="px-4  md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* ----------Newsletter Card -------------*/}
            <div className="bg-[#F5F5F7] rounded-2xl shadow-lg p-8  md:p-12 md:translate-y-14  lg:md:translate-y-10 absolute -top-30 md:top-28  z-50 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Weekly Research Digest
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gray-800 rounded-sm flex items-center justify-center">
                        <Mail className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">
                        New protocol releases
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gray-800 rounded-sm flex items-center justify-center">
                        <Lightbulb className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">
                        Research breakthroughs
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gray-800 rounded-sm flex items-center justify-center">
                        <Users className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">
                        Community highlights
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-700"
                  >
                    <option value="">Research Interest</option>
                    <option value="crispr">CRISPR</option>
                    <option value="car-t">CAR-T</option>
                    <option value="mrna">mRNA</option>
                    <option value="other">Other</option>
                  </select>
                  <button className="w-full bg-[#17AA80] cursor-pointer hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                    Subscribe to Updates
                  </button>
                  <p className="text-sm text-gray-500 text-center">
                    No spam. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*------------------------- Footer--------------- */}
        <footer className="relative  overflow-hidden mt-20 ">
          {/* footer background image */}

          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundfooter})` }}
          ></div>

          <div className=" px-4 py-58 relative z-10 translate-y-28">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Logo and Description */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-28 h-20 bg-transparent">
                    <img src={logo} alt="" />
                  </div>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  Open, peer-reviewed protocols for CRISPR, CAR-T, and
                  AI-designed mRNA research. Accelerating biotechnology through
                  collaborative science.
                </p>
              </div>

              {/* Platform Links */}
              <div>
                <h3 className="font-semibold mb-4 text-white">Platform</h3>
                <ul className="space-y-2 text-sm text-white">
                  <li>
                    <a href="#" className="hover:text-white">
                      MVP
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Protocols
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Roadmap
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Roles
                    </a>
                  </li>
                </ul>
              </div>

              {/* --------------Support Links --------------------------*/}
              <div>
                <h3 className="font-semibold text-white mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-green-100">
                  <li>
                    <a href="#" className="hover:text-white">
                      Donate
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Apply to join
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Community Guidelines
                    </a>
                  </li>
                </ul>
              </div>

              {/*------------ Resources Links------------ */}
              <div>
                <h3 className="font-semibold text-white mb-4">Resources</h3>
                <ul className="space-y-2 text-sm text-green-100">
                  <li>
                    <a href="#" className="hover:text-white">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      API
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* --------------Bottom Footer --------------------------------*/}
            <div className="mt-8 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Social Icons */}
                <div className="flex gap-4 text-white">
                  <a href="#" className="hover:text-white">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="hover:text-white">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="hover:text-white">
                    <Linkedin size={18} />
                  </a>
                  <a href="#" className="hover:text-white">
                    <Twitter size={18} />
                  </a>
                </div>

                {/* ------------- Copyright and Links ------------------*/}
                <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-green-100">
                  <span>© 2025 OpenGene. All rights reserved.</span>
                  <div className="flex gap-4">
                    <a href="#" className="hover:text-white">
                      Privacy Policy
                    </a>
                    <a href="#" className="hover:text-white">
                      Terms of Service
                    </a>
                    <a href="#" className="hover:text-white">
                      Cookie Policy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
