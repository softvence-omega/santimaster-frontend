import { User } from "lucide-react";
import React, { useState } from "react";
import type { Protocol } from "../../../types/potocols.type";

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
  const getStatusStyles = () => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-700 border-green-200";
      case "DRAFT":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "REJECTED":
        return "bg-red-100 text-red-700 border-red-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles()}`}
    >
      {status}
    </span>
  );
};

const ProtocolCard = ({ protocol }: { protocol: Protocol }) => {
  return (
    <div className="rounded-lg p-6 mb-4 bg-white border shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{protocol?.protocolTitle}</h3>
      <p className="text-gray-600 text-sm mb-4">{protocol?.protocolDescription}</p>

      <div className="flex justify-between items-start mb-4">
        <div className="flex space-x-8">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Reviewer:</p>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-900">{protocol?.authors}</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Submitted:</p>
            <p className="text-sm text-gray-900">{protocol?.createdAt}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Status:</p>
          <StatusBadge status={protocol?.status as ProtocolCardProps["status"]} />
        </div>
      </div>
    </div>
  );
};


const SubmittedProtocols = ({ published }: { published: Protocol[] }) => {
  const [filter, setFilter] = useState<
    "ALL" | "PUBLISHED" | "DRAFT" | "REJECTED" | "PENDING"
  >("ALL");

  const filteredProtocols =
    filter === "ALL"
      ? published
      : published.filter((protocol) => protocol.status === filter);


  return (
    <div className="px-6 max-w-5xl mx-auto py-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Submitted Protocols
        </h1>

        {/* Dropdown filter */}
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
          className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 cursor-pointer bg-white"
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
          filteredProtocols?.map((protocol, index) => (
            <ProtocolCard key={index} protocol={protocol as Protocol} />
          ))
        ) : (
          <p className="text-sm text-gray-600">No submitted protocols found.</p>
        )}
      </div>
    </div>
  );
};

export default SubmittedProtocols;
