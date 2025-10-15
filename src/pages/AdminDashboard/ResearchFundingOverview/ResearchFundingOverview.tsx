import React from "react";
import SectionHeader from "../../../utils/SectionHeading";

import { useGetDonationsQuery } from "../../../redux/features/donation/donation.api";
import Loading from "../../../utils/Loading";

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

interface DonationOverview {
  totalDonation: number;
  averageDonation: string;
  donationCount: number;
  donations: RecentDonar[];
}

const ResearchFundingOverview: React.FC = () => {
  const { data, isLoading, error } = useGetDonationsQuery();

  const donations = data?.data?.donations || [];
  const totalDonation = donations.reduce((acc, d) => acc + d.amount, 0);
  const averageDonation =
    donations.length > 0 ? (totalDonation / donations.length).toFixed(0) : "0";
  const donationCount = donations.length;

  const donation: DonationOverview | undefined = data?.data
    ? {
      totalDonation,
      averageDonation,
      donationCount,
      donations,
    }
    : undefined;

  if (isLoading)
    return (
      <div>
        {" "}
        <Loading />
      </div>
    );
  if (error) return <p className="text-red-500">Error loading donations.</p>;

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 container mx-auto">
      {/* Header */}
      <SectionHeader
        title="Research Funding Overview"
        subtitle="Community support and donation tracking"
      />

      {/* Stats and Progress */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
        {/* Stats Cards */}
        
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
              {donation?.donationCount || 0}
            </div>
            <div className="text-sm sm:text-base text-gray-600 mb-2">
              Active Donors
            </div>
            <div className="flex items-center text-xs sm:text-sm">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-black bg-[#DDE9E5] font-medium">
                +12% this month
              </span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
              ${donation?.averageDonation || 0}
            </div>
            <div className="text-sm sm:text-base text-gray-600 mb-2">
              Avg Donation
            </div>
            <div className="flex items-center text-xs sm:text-sm">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-black bg-[#DDE9E5] font-medium">
                +8% this month
              </span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
              ${totalDonation || 0}
            </div>
            <div className="text-sm sm:text-base text-gray-600 mb-2">
              Total Donation
            </div>
            <div className="flex items-center text-xs sm:text-sm">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-black bg-[#DDE9E5] font-medium">
                +8% this month
              </span>
            </div>
          </div>
      </div>

      {/* Donation Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Donor Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Country
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Tribute
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Donation Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {donation?.donations.map((d) => (
              <tr key={d._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{d.donarName}</td>
                <td className="px-4 py-3">{d.donarEmail}</td>
                <td className="px-4 py-3">{d.country}</td>
                <td className="px-4 py-3">{d.tribute || "-"}</td>
                <td className="px-4 py-3">{d.donationType}</td>
                <td className="px-4 py-3 font-semibold">${d.amount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${d.paymentStatus === "SUCCESS"
                      ? "bg-emerald-100 text-emerald-700"
                      : d.paymentStatus === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    {d.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {new Date(d.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {!donation?.donations.length && (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                  No donations available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResearchFundingOverview;
