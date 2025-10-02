import React, { useState, useMemo } from "react";
import type { Protocol } from "../../../types/userdashboard.type";
import { User } from "lucide-react";
import { useGetUserDashboardQuery } from "../../../redux/userdasboad/userdashboard"; // Use working API hook
import SkeletonLoader from "../../../shared/SkeletonLoader";

interface ProtocolCardProps {
  title: string;
  description: string;
  reviewer: {
    name: string;
    avatar?: string;
  };
  submitted: string;
  status: "PUBLISHED" | "DRAFT" | "REJECTED" | "PENDING";
  reviewerNote?: string;
}

const StatusBadge: React.FC<{ status: ProtocolCardProps["status"] }> = ({
  status,
}) => {
  const statusStyles: Record<ProtocolCardProps["status"], string> = {
    PUBLISHED: "bg-green-100 text-green-700 border-green-200",
    DRAFT: "bg-gray-100 text-gray-700 border-gray-200",
    REJECTED: "bg-red-100 text-red-700 border-red-200",
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium border ${
        statusStyles[status] || "bg-gray-100 text-gray-700 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
};

const ProtocolCard: React.FC<{ protocol: Protocol }> = ({ protocol }) => {
  return (
    <div className="rounded-lg p-6 mb-4 bg-white border shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {protocol.protocolTitle || "Untitled Protocol"}
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        {protocol.protocolDescription || "No description available"}
      </p>
      <div className="flex justify-between items-start mb-4">
        <div className="flex space-x-8">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Reviewer:</p>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-900">
                {protocol.authors || "Unknown"}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Submitted:</p>
            <p className="text-sm text-gray-900">
              {protocol.createdAt
                ? new Date(protocol.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Status:</p>
          <StatusBadge
            status={(protocol.status as ProtocolCardProps["status"]) || "DRAFT"}
          />
        </div>
      </div>
    </div>
  );
};

const SubmittedProtocols: React.FC = () => {
  const [filter, setFilter] = useState<
    "ALL" | "PUBLISHED" | "DRAFT" | "REJECTED" | "PENDING"
  >("ALL");

  // Fetch protocols using useGetUserDashboardQuery
  const { data: dashboardData, isLoading, error } = useGetUserDashboardQuery();

  if (isLoading) {
    return (
      <div className="grid place-items-center">
        <SkeletonLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid place-items-center text-red-600">
        <p>
          {error && "data" in error && error.data
            ? (error.data as { message?: string }).message ||
              "Failed to load protocols"
            : "An error occurred while fetching protocols. Please try again."}
        </p>
      </div>
    );
  }

  // Combine protocols from dashboard data
  const protocols: Protocol[] = [
    ...(dashboardData?.data?.protocols?.published || []),
    ...(dashboardData?.data?.protocols?.rejected || []),
    ...(dashboardData?.data?.protocols?.pending || []),
    ...(dashboardData?.data?.protocols?.draft || []),
  ].filter(Boolean);

  // Memoize filtered protocols to avoid unnecessary re-renders
  const filteredProtocols = useMemo(
    () =>
      filter === "ALL"
        ? protocols
        : protocols.filter(
            (protocol) => protocol.status?.toUpperCase() === filter
          ),
    [protocols, filter]
  );

  // Debugging logs
  console.log("Fetched protocols:", protocols);
  console.log("Current filter:", filter);
  console.log("Filtered protocols:", filteredProtocols);

  return (
    <div className="px-6 max-w-5xl mx-auto py-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Submitted Protocols
        </h1>
        <select
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value as
                | "ALL"
                | "PUBLISHED"
                | "DRAFT"
                | "REJECTED"
                | "PENDING"
            )
          }
          className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="REJECTED">Rejected</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>
      <div className="space-y-4">
        {filteredProtocols.length > 0 ? (
          filteredProtocols.map((protocol) => (
            <ProtocolCard
              key={protocol._id || Math.random().toString()}
              protocol={protocol}
            />
          ))
        ) : (
          <p className="text-sm text-gray-600 text-center">
            No protocols found for the selected filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default SubmittedProtocols;
