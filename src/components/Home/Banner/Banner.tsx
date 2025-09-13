import { Link } from "react-router-dom";
import Bannerimg from "../../../assets/Homeimg/Bannerimg.png";
import VirusImg from "../../../assets/Homeimg/virus.png";
import menicon from "../../../assets/icon/men.svg";
import uploadicon from "../../../assets/icon/upload.svg";

const Banner = () => {
  return (
    <div className="relative bg-[#0b0f29] h-screen text-white overflow-hidden">
      {/* ---------Background Image----------- */}
      <div className="absolute inset-0">
        <img
          src={Bannerimg}
          alt="DNA Background"
          className="object-cover object-center w-full h-full"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full px-10 md:px-20">
        <h1 className="text-4xl md:text-5xl font-bold leading-snug max-w-2xl">
          Open, Peer Reviewed <br /> Gene Editing Protocols
        </h1>
        <p className="text-lg text-gray-300 mt-4 max-w-xl">
          Search rigorously reviewed methods, submit your own, and accelerate
          CRISPR, CAR-T, and AI-designed mRNA research.
        </p>

        {/*------------- Buttons with Icons ------------------*/}
        <div className="grid md:flex  lg:flex gap-4 mt-8">
          <Link
            to="/apply"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white py-3 px-6 rounded-md font-semibold transition duration-300"
          >
            <img src={menicon} alt="Join Icon" className="w-5 h-5" />
            Apply to Join
          </Link>

          <Link
            to="/submit"
            className="flex items-center gap-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white py-3 px-6 rounded-md font-semibold transition duration-300"
          >
            <img src={uploadicon} alt="Protocol Icon" className="w-5 h-5" />
            Submit a Protocol
          </Link>
        </div>
      </div>

      {/* Virus Image bottom-left, fixed size */}
      <div className="absolute mt-6 bottom-0 left-0 w-[377px] h-[377px] flex-shrink-0">
        <img
          src={VirusImg}
          alt="Virus Illustration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Banner;
