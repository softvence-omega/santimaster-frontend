import { Link } from "react-router-dom";
import AccessCard from "../../../assets/Mvp/accesscardmicro.png";
import SectionHeader from "../../../utils/SectionHeading";
import menicon from "../../../assets/icon/men.svg";
import uploadicon from "../../../assets/icon/upload.svg";
const MVPAccessCard = () => {
  return (
    <div className="w-full ">
      <div className="relative  ">
        <div className=" grid grid-cols-1 lg:grid-cols-2  md:grid-cols-2 sm:grid-flow-row-dense gap-8 relative z-10 p-8 lg:p-12  w-full py-28 bg-[#E8F0EE] h-fit">
          {/* Left Content */}
          <div className="grid justify-center space-y-6">
            <SectionHeader
              title="  Want early access to the MVP?"
              subtitle=" Apply to join the beta program and help shape the future of
              protocol sharing in the research community."
            ></SectionHeader>
            {/* ---------------button----------- */}
            <div className="grid md:flex  lg:flex gap-4 mt-8">
              <Link
                to="/gene-application"
                className="flex justify-center items-center gap-[10px] px-[28px] py-[16px] rounded-[8px] bg-[#17AA80] text-white font-normal transition duration-300 hover:bg-[#13996F]"
              >
                <img src={menicon} alt="Join Icon" className="w-5 h-5" />
                Apply to Join
              </Link>

              <Link
                to="/submit-protocol"
                className="flex justify-center items-center gap-[10px] px-[28px] py-[16px] rounded-[8px] border border-[#17AA80] text-[#17AA80] hover:bg-[#17AA80] hover:text-white font-normal transition duration-300"
              >
                <img src={uploadicon} alt="Protocol Icon" className="w-5 h-5" />
                Submit a Protocol
              </Link>
            </div>
          </div>

          {/* Right Image - Overflowing */}
          <div className="relative md:-translate-10 lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-1/2">
            <div className="relative h-64 lg:h-full">
              {/* Image container with overflow */}
              <div className="absolute   mb-6 lg:left-8 rounded-xl overflow-hidden shadow-xl">
                <img
                  src={AccessCard}
                  alt="Laboratory microscope and research equipment"
                  className="w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MVPAccessCard;
