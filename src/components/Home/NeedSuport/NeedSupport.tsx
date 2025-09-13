import supportimage from "../../../assets/Homeimg/support.png";

const NeedSupport = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-blue-600  text-white overflow-hidden max-h-[1000px]">
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
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        {/* Heading */}
        <div>
          <h2 className="text-lg md:text-2xl font-bold">
            Open science needs your support
          </h2>
          <p className="text-xs md:text-sm text-teal-100 mt-2 max-w-xl mx-auto">
            Help us maintain free access to peer-reviewed protocols and
            accelerate biotechnology research worldwide
          </p>
        </div>

        {/* Donate Button */}
        <div className="mt-6">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full flex items-center whitespace-nowrap transition transform hover:scale-105 hover:shadow-lg">
            <span className="text-lg md:text-xl">💚</span>
            <span className="ml-2 text-sm md:text-base">Donate Now</span>
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-col md:flex-row md:space-x-10 mt-8 space-y-4 md:space-y-0">
          <div className="text-center">
            <p className="text-2xl font-bold">100%</p>
            <p className="text-xs text-teal-100">Open Access</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">$0</p>
            <p className="text-xs text-teal-100">Publication Fees</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">20%</p>
            <p className="text-xs text-teal-100">Impact Potential</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedSupport;
