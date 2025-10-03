import {
  Facebook,
  Instagram,
  Lightbulb,
  Linkedin,
  Mail,
  Twitter,
  Users,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import backgroundfooter from "../../assets/Homeimg/footer-ragtangle.png";
import logo from "../../assets/logo/whitelogo.png";
import { useCreateSubscriberMutation } from "../../redux/features/subscribe/subscribe.api";
import SectionHeader from "../../utils/SectionHeading";

const Footer = () => {
  const [createSubscribe, { isLoading, isSuccess, error }] =
    useCreateSubscriberMutation();
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");

  const handleSubscribe = async () => {
    if (!email || !interest) return alert("Please fill in all fields.");

    try {
      await createSubscribe({ email, interest }).unwrap();
      setEmail("");
      setInterest("");
      toast("Subscribed successfully!");
    } catch (err) {
      console.error(err);
      toast("Failed to subscribe. Try again.");
    }
  };

  return (
    <div className="relative border border-white mt-20 md:mt-80">
      {/* ---------- Subscribe Section ---------- */}
      <div
        className=" flex flex-col items-center justify-center space-y-5 w-full px-4 md:absolute  md:right-1/2 md:transform md:translate-x-1/2 md:-translate-y-1/2 md:-top-10 z-50"
      >
        <SectionHeader
          title="Stay Updated"
          subtitle="Get the latest protocols, research insights, and community updates delivered to your inbox"
        />
        <div className="bg-[#F5F5F7] rounded-2xl shadow-lg p-6 md:p-12 w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Features */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Weekly Research Digest
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Mail, text: "New protocol releases" },
                  { icon: Lightbulb, text: "Research breakthroughs" },
                  { icon: Users, text: "Community highlights" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-800 rounded-sm flex items-center justify-center">
                      <item.icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
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
              <button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="w-full bg-[#17AA80] cursor-pointer hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                {isLoading ? "Subscribing..." : "Subscribe to Updates"}
              </button>
              {isSuccess && (
                <p className="text-sm text-green-600 text-center">
                  Subscribed successfully!
                </p>
              )}
              {error && (
                <p className="text-sm text-red-600 text-center">
                  Failed to subscribe.
                </p>
              )}
              <p className="text-sm text-gray-500 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Footer Section ---------- */}
      <footer className="container mx-auto mt-[800px] md:mt-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundfooter})` }}
        ></div>

        <div className="px-4 md:pt-58 pb-20 md:pb-48 relative z-10">
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
                  <Link to="/mvp" className="hover:text-white">
                    MVP
                  </Link>
                </li>
                <li>
                  <Link to="/protocol" className="hover:text-white">
                    Protocols
                  </Link>
                </li>
                <li>
                  <Link to="/roadmap" className="hover:text-white">
                    Roadmap
                  </Link>
                </li>
                <li>
                  <Link to={"/roles"} className="hover:text-white">
                    Roles
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-green-100">
                <li>
                  <Link to="/donation" className="hover:text-white">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link to="/contract" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/gene-application" className="hover:text-white">
                    Apply to join
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Community Guidelines
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
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

          {/* Bottom Footer */}
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

              {/* Copyright */}
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
  );
};

export default Footer;
