import { Link } from "react-router-dom";
import AccessCard from "../../../assets/Mvp/accesscardmicro.png";
import SectionHeader from "../../../utils/SectionHeading";
import menicon from "../../../assets/icon/men.svg";
import uploadicon from "../../../assets/icon/upload.svg";
const MVPAccessCard = () => {
  return (
    <div className="w-full p-8">
      <div className="relative  ">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12  w-full max-w-[1920px] px-[124px] py-[140px] bg-[#E8F0EE]">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6">
            {/* <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Want early access to the MVP?
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              Apply to join the beta program and help shape the future of
              protocol sharing in the research community.
            </p> */}
            <SectionHeader
              title="  Want early access to the MVP?"
              subtitle=" Apply to join the beta program and help shape the future of
              protocol sharing in the research community."
            ></SectionHeader>
            {/* ---------------button----------- */}
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
                <img src={uploadicon} alt="Protocol Icon" className="w-5 h-5" />
                Submit a Protocol
              </Link>
            </div>
          </div>

          {/* Right Image - Overflowing */}
          <div className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-1/2">
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
