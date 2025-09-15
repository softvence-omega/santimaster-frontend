import supportimage from "../../../assets/Homeimg/support.png";

const NeedSupport = () => {
  return (
    <div className="relative w-full mt-16 flex justify-center items-center px-4 sm:px-8 md:px-16 lg:px-[522px] py-24 bg-black/50 backdrop-blur-sm">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={supportimage}
          alt="Background Image"
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center w-full max-w-7xl">
        {/* Heading */}
        <div>
          <h2 className="text-[#F5F5F7] font-barlow font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Open science needs your support
          </h2>

          <p className="text-[#F5F5F7] font-roboto font-normal text-base sm:text-lg md:text-xl leading-[1.4] mt-2 max-w-xl mx-auto">
            Help us maintain free access to peer-reviewed protocols and
            accelerate biotechnology research worldwide
          </p>
        </div>

        {/* Donate Button */}
        <div className="mt-6">
          <button className="flex cursor-pointer items-center justify-center gap-2 px-7 py-4 bg-[#17AA80] rounded-lg text-white font-semibold transition transform hover:scale-105 hover:shadow-lg">
            <span className="text-lg md:text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                {/* SVG path omitted for brevity */}
              </svg>
            </span>
            <span className="text-sm md:text-base">Donate Now</span>
          </button>
        </div>

        {/* Stats with percentage */}
        <div className="flex flex-col md:flex-row md:space-x-10 mt-8 space-y-4 md:space-y-0 w-full justify-center">
          <div className="text-center flex flex-col gap-2">
            <p className="text-[#F5F5F7] font-barlow font-semibold text-4xl sm:text-5xl md:text-5xl lg:text-6xl">
              100%
            </p>
            <p className="text-[#F5F5F7] font-roboto font-normal text-base sm:text-lg md:text-xl leading-[1.4]">
              Open Access
            </p>
          </div>
          <div className="text-center flex flex-col gap-2">
            <p className="text-[#F5F5F7] font-barlow font-semibold text-4xl sm:text-5xl md:text-5xl lg:text-6xl">
              $0
            </p>
            <p className="text-[#F5F5F7] font-roboto font-normal text-base sm:text-lg md:text-xl leading-[1.4]">
              Publication Fees
            </p>
          </div>
          <div className="text-center flex flex-col gap-2">
            <p className="text-[#F5F5F7] font-barlow font-semibold text-4xl sm:text-5xl md:text-5xl lg:text-6xl">
              20%
            </p>
            <p className="text-[#F5F5F7] font-roboto font-normal text-base sm:text-lg md:text-xl leading-[1.4]">
              Impact Potential
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedSupport;
