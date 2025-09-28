import { useGetMeQuery } from "../../../redux/features/auth/auth.api";
import SectionHeader from "../../../utils/SectionHeading";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserDashboardOverview() {
  const { data, isLoading, error } = useGetMeQuery(null);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch user profile!");
      console.error("GetMe error:", error);
    }
  }, [error]);

  // User data from getMe response
  const user = data?.data;
  const userName = user?.fullName || user?.email || "User";
  const userImage = user?.profileImage || "https://via.placeholder.com/80"; // Fallback image
  const userAffiliation = user?.affiliation || "N/A";
  const userOrcid = user?.orcid || "N/A";

  return (
    <div className="py-40 ">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#E8F0EE] via-[#80AB9E] to-[#1D6953] text-white rounded-xl shadow p-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <SectionHeader
            title={`Welcome back, ${userName}!`}
            subtitle="You have protocols pending review and new notifications."
          />
          <Link to="/protocol">
            <button className="mt-4 px-4 py-2 bg-[#17AA80] text-white font-medium rounded-lg shadow hover:bg-[#13996F] transition">
              Browse Protocols
            </button>
          </Link>
        </div>
        {isLoading ? (
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-36 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="grid items-center gap-4 sm:ml-3">
            <img
              src={userImage}
              alt={userName}
              className="w-20 h-20 rounded-full border-2 border-white shadow object-cover"
            />
            <div className="text-center sm:text-left">
              <p className="font-medium">{userName}</p>
              <p className="text-sm">Research Scientist</p>
              <p className="text-xs">{userAffiliation}</p>
              <p className="text-xs">ORCID: {userOrcid}</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 sm:p-6">
        {[
          { title: "Draft Protocols", value: 7, sub: "12.5% ready" },
          { title: "Under Review", value: 3, sub: "Avg. 5 days" },
          { title: "Published", value: 12, sub: "95% approval rate" },
          { title: "Total Views", value: 12, sub: "170% this month" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-4 text-center hover:shadow-md transition"
          >
            <p className="text-3xl font-bold text-[#17AA80]">{item.value}</p>
            <p className="mt-1 font-medium">{item.title}</p>
            <p className="text-sm text-gray-500">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
