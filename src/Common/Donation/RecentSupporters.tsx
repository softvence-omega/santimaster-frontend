import { useGetDonationsQuery } from "../../redux/features/donation/donation.api";
import SectionHeader from "../../utils/SectionHeading";

type Supporter = {
  name: string;
  timeAgo: string;
  message: string;
  amount: number;
  avatar: string;
};

const RecentSupporters = () => {
  const { data, isLoading, isError } = useGetDonationsQuery(undefined);
  console.log(data)

  // Fallback avatars for variety
  const avatars = [
    "https://i.pravatar.cc/100?img=1",
    "https://i.pravatar.cc/100?img=2",
    "https://i.pravatar.cc/100?img=3",
    "https://i.pravatar.cc/100?img=4",
    "https://i.pravatar.cc/100?img=5",
  ];

  const supporters: Supporter[] =
    data?.map((donation: any, idx: number) => ({
      name: donation.donarName || "Anonymous Donor",
      timeAgo: new Date(donation.createdAt).toLocaleDateString(), 
      message: donation.tribute || "Supporting open science.",
      amount: donation.amount,
      avatar: avatars[idx % avatars.length], 
    })) || [];

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-12">
      <SectionHeader
        title="Recent Supporters"
        subtitle="Join these amazing individuals supporting open science"
      />

      {/* Loading / Error states */}
      {isLoading && (
        <p className="text-center text-gray-500 mt-6">Loading supporters...</p>
      )}
      {isError && (
        <p className="text-center text-red-500 mt-6">
          Failed to load supporters.
        </p>
      )}

      {/* Supporters list */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {supporters.map((supporter, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <img
                src={supporter.avatar}
                alt={supporter.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{supporter.name}</p>
                <p className="text-gray-500 text-sm">{supporter.timeAgo}</p>
              </div>
            </div>

            {/* Message */}
            <p className="mt-4 text-gray-700 text-sm leading-relaxed">
              "{supporter.message}"
            </p>

            {/* Amount */}
            <p className="mt-4 text-blue-600 font-semibold text-lg">
              ${supporter.amount}
            </p>
          </div>
        ))}
      </div>

      {/* View all link */}
      <div className="text-center mt-8">
        <a
          href="#"
          className="text-blue-600 font-medium hover:underline inline-flex items-center"
        >
          View all supporters →
        </a>
      </div>
    </section>
  );
};

export default RecentSupporters;
