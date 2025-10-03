import { useGetMeQuery } from "../../../redux/features/auth/auth.api";
import { useGetUserDashboardQuery } from "../../../redux/features/userdasboad/userdashboard";
import SectionHeader from "../../../utils/SectionHeading";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../utils/Loading";

export default function UserDashboardOverview() {
  const {
    data: userData,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useGetMeQuery(null);

  // Fetch protocols
  const {
    data: protocolData,
    isLoading: isLoadingProtocol,
    error: errorProtocol,
  } = useGetUserDashboardQuery();

  // Handle errors
  useEffect(() => {
    if (errorUser) {
      toast.error("Failed to fetch user profile!");
      console.error("GetMe error:", errorUser);
    }
    if (errorProtocol) {
      toast.error("Failed to fetch protocols!");
      console.error("Protocols error:", errorProtocol);
    }
  }, [errorUser, errorProtocol]);

  // User info
  const user = userData?.data;
  const userName = user?.fullName || user?.email || "User";
  const userImage = user?.profileImage || "https://via.placeholder.com/80";
  const userAffiliation = user?.affiliation || "N/A";
  const userOrcid = user?.orcid || "N/A";

  // Protocol overview
  const overview = protocolData?.data?.overview || {
    draft: 0,
    pending: 0,
    published: 0,
    rejected: 0,
  };
  const stats = [
    {
      title: "Draft Protocols",
      value: overview.draft || 0,
      sub: `${overview.draft || 0} protocols`,
    },
    {
      title: "Pending Protocols",
      value: overview.pending || 0,
      sub: `${overview.pending || 0} awaiting review`,
    },
    {
      title: "Published",
      value: overview.published || 0,
      sub: `${overview.published || 0} approved`,
    },
    {
      title: "Rejected",
      value: overview.rejected || 0,
      sub: `${overview.rejected || 0} rejected`,
    },
  ];

  if (isLoadingProtocol || isLoadingUser) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loading />
        <p className="mt-4 text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="pt-40 mx-auto max-w-6xl px-4 sm:px-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#E8F0EE] via-[#80AB9E] to-[#1D6953] text-white rounded-xl shadow p-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-center sm:text-left">
          <SectionHeader
            title={`Welcome back, ${userName}!`}
            subtitle="You have protocols pending review and new notifications."
          />
          <Link to="/protocol">
            <button className="mt-4 px-4 py-2 bg-[#17AA80] text-white font-medium rounded-lg shadow hover:bg-[#13996F] transition w-full sm:w-auto">
              Browse Protocols
            </button>
          </Link>
        </div>

        {isLoadingUser ? (
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
          <div className="flex flex-col sm:flex-row items-center gap-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4 sm:p-6">
        {stats.map((item, i) => (
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
