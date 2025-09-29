import { useGetDonationsQuery } from "../../redux/features/donation/donation.api";
import SectionHeader from "../../utils/SectionHeading";

const FundingGoal = () => {
  const { data, isLoading, isError } = useGetDonationsQuery(undefined);

  // Extract safely
  const donations = data?.data?.donations || [];

  // Calculate stats
  const raised = donations.reduce(
    (sum: number, donation: any) => sum + (donation.amount || 0),
    0
  );

  const goal = 500000; // You can make this dynamic if API provides
  const totalDonors = donations.length;
  const averageDonation =
    donations.length > 0 ? Math.round(raised / donations.length) : 0;

  const progress = goal > 0 ? Math.round((raised / goal) * 100) : 0;

  return (
    <section className="w-full max-w-3xl mx-auto p-6 rounded-xl">
      <SectionHeader
        title="2024 Funding Goal"
        subtitle="Help us reach our annual target to expand platform capabilities"
      />

      {/* Loading / Error */}
      {isLoading && (
        <p className="text-center text-gray-500 mt-6">Loading funding stats...</p>
      )}
      {isError && (
        <p className="text-center text-red-500 mt-6">
          Failed to load funding data.
        </p>
      )}

      {!isLoading && !isError && (
        <>
          {/* Progress bar */}
          <div className="mt-6">
            <div className="relative w-full h-3 bg-gray-50 overflow-hidden rounded-full">
              <div
                className="absolute left-0 top-0 h-3 bg-green-700 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm font-medium mt-2">
              <span className="text-gray-900">
                ${raised.toLocaleString()}
              </span>
              <span className="text-blue-600">${goal.toLocaleString()}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg text-center shadow-sm">
              <p className="text-xl font-semibold">
                {totalDonors.toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm">Total Donors</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center shadow-sm">
              <p className="text-xl font-semibold">
                ${averageDonation.toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm">Average Donation</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center shadow-sm">
              <p className="text-xl font-semibold">{progress}%</p>
              <p className="text-gray-500 text-sm">Progress</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default FundingGoal;
