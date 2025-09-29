import React from "react";
import { ChevronDown, User } from "lucide-react";

interface ProtocolCardProps {
  title: string;
  description: string;
  reviewer: {
    name: string;
    avatar?: string;
  };
  submitted: string;
  status: {
    label: string;
    type: "under-review" | "published" | "pending";
  };
  reviewerNote?: string;
}

const StatusBadge: React.FC<{ status: ProtocolCardProps["status"] }> = ({
  status,
}) => {
  const getStatusStyles = () => {
    switch (status.type) {
      case "under-review":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "published":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles()}`}
    >
      {status.label}
    </span>
  );
};

const ProtocolCard: React.FC<ProtocolCardProps> = ({
  title,
  description,
  reviewer,
  submitted,
  status,
  reviewerNote,
}) => {
  return (
    <div className="rounded-lg p-6 mb-4 bg-white border shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>

      <div className="flex justify-between items-start mb-4">
        <div className="flex space-x-8">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Reviewer:</p>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-900">{reviewer.name}</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Submitted:</p>
            <p className="text-sm text-gray-900">{submitted}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Status:</p>
          <StatusBadge status={status} />
        </div>
      </div>

      {reviewerNote && reviewerNote.trim() !== "" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
          <p className="text-sm">
            <span className="font-medium text-gray-700">Reviewer Note:</span>{" "}
            <span className="text-gray-600">{reviewerNote}</span>
          </p>
        </div>
      )}
    </div>
  );
};

interface SubmittedProtocolsProps {
  published: ProtocolCardProps[];
}

const SubmittedProtocols: React.FC<SubmittedProtocolsProps> = ({ published }) => {
  return (
    <div className="px-6 max-w-5xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Submitted Protocols
        </h1>
        <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50">
          <span className="text-sm text-gray-700">All Statuses</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      <div className="space-y-4">
        {published.length > 0 ? (
          published.map((protocol, index) => (
            <ProtocolCard key={index} {...protocol} />
          ))
        ) : (
          <p className="text-sm text-gray-600">No submitted protocols found.</p>
        )}
      </div>
    </div>
  );
};

export default SubmittedProtocols;
