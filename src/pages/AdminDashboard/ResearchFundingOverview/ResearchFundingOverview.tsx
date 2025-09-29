import SectionHeader from "../../../utils/SectionHeading";

interface RecentDonar {
  _id: string;
  donationType: string;
  amount: number;
  donarName: string;
  donarEmail: string;
  country: string;
  tribute?: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

interface Donation {
  totalDonar: number;
  avgDonation: string;
  recentDonar: RecentDonar[];
}

interface ResearchFundingOverviewProps {
  donation?: Donation;
}

const ResearchFundingOverview: React.FC<ResearchFundingOverviewProps> = ({ donation }) => {
  const currentAmount = donation?.recentDonar.reduce((acc, d) => acc + d.amount, 0) || 0;
  const targetAmount = 15000;
  const progressPercentage = Math.round((currentAmount / targetAmount) * 100);

  return (
    <div className="py-15 p-6">
      {/* Header */}
      <div className="mb-8 mx-w-2xl justify-items-start">
        <SectionHeader
          title="Research Funding Overview"
          subtitle="Community support and donation tracking"
        />
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
                  ${currentAmount.toLocaleString()} / ${targetAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
                <div
                  className="bg-green-600 h-3 sm:h-4 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${progressPercentage}%` }}
                />
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
                {donation?.totalDonar || 0}
              </div>
              <div className="text-sm sm:text-base text-gray-600 mb-2">Active Donors</div>
              <div className="flex items-center text-xs sm:text-sm">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-black bg-[#DDE9E5] font-medium">
                  +12% this month
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                ${donation?.avgDonation || 0}
              </div>
              <div className="text-sm sm:text-base text-gray-600 mb-2">Avg Donation</div>
              <div className="flex items-center text-xs sm:text-sm">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-black bg-[#DDE9E5] font-medium">
                  +8% this month
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Recent Donations */}
        <div className="xl:col-span-1">
          <div className="bg-white">
            <div className="flex items-center justify-between mb-6 p-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Donations</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {donation?.recentDonar.map((donar) => (
                <div
                  key={donar._id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(donar.donarName)}&background=6b7280&color=ffffff&size=40`}
                      alt={donar?.donarName}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                        {donar?.donarName}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-sm sm:text-base font-semibold text-gray-900">
                      ${donar?.amount}
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
