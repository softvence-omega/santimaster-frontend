import { Upload } from "lucide-react";
import { Link } from "react-router-dom";
import Bannerimg from "../../../assets/Homeimg/Bannerimg.png";
import VirusImg from "../../../assets/Homeimg/virus.png";
import menicon from "../../../assets/icon/men.svg";

export default function Banner() {
  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden pt-30">
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
                  <Upload />
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
