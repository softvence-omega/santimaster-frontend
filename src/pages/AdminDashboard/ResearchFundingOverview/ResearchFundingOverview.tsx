import SectionHeader from "../../../utils/SectionHeading";

const ResearchFundingOverview = () => {
  const donations = [
    {
      id: 1,
      name: "Dr. Maria Lopez",
      amount: "$250",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face&faceindex=1",
    },
    {
      id: 2,
      name: "Anonymous",
      amount: "$100",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&faceindex=1",
    },
    {
      id: 3,
      name: "BioTech corp",
      amount: "$1,000",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=32&h=32&fit=crop&crop=face&faceindex=1",
    },
    {
      id: 4,
      name: "Research Fund",
      amount: "$500",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face&faceindex=1",
    },
  ];

  const currentAmount = 12400;
  const targetAmount = 15000;
  const progressPercentage = Math.round((currentAmount / targetAmount) * 100);

  return (
    <div className=" py-15 p-6 ">
      {/* Header */}
      <div className="mb-8 mx-w-2xl justify-items-start">
        {/* <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Research Funding Overview
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Community support and donation tracking
          </p> */}
        <SectionHeader
          title="Research Funding Overview"
          subtitle="  Community support and donation tracking"
        ></SectionHeader>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 shadow-sm p-4">
        {/* Left Section - Monthly Goal Progress */}
        <div className="xl:col-span-2 space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-0">
                Monthly Goal Progress
              </h2>
              <div className="text-right">
                <span className="text-lg sm:text-xl font-semibold text-gray-900">
                  ${currentAmount.toLocaleString()} / $
                  {targetAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
                <div
                  className="bg-green-600 h-3 sm:h-4 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {progressPercentage}% of monthly target reached
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                247
              </div>
              <div className="text-sm sm:text-base text-gray-600 mb-2">
                Active Donors
              </div>
              <div className="flex items-center text-xs sm:text-sm">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-black bg-[#DDE9E5] font-medium">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  +12% this month
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                $52
              </div>
              <div className="text-sm sm:text-base text-gray-600 mb-2">
                Avg Donation
              </div>
              <div className="flex items-center text-xs sm:text-sm">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-black bg-[#DDE9E5] font-medium">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  +8% this month
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Recent Donations */}
        <div className="xl:col-span-1 ">
          <div className="bg-white">
            <div className="flex items-center justify-between mb-6 p-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Recent Donations
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {donations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={donation.avatar}
                      alt={donation.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          donation.name
                        )}&background=6b7280&color=ffffff&size=40`;
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                        {donation.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-sm sm:text-base font-semibold text-gray-900">
                      {donation.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchFundingOverview;
