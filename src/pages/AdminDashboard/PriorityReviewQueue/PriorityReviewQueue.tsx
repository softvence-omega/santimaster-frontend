import { Edit } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useUpdateProtocolStatusMutation } from "../../../redux/admindashboard/admindashboard";
import type { Protocol } from "../../../types/admindashboard.type";

interface PriorityReviewQueueProps {
  pendingProtocol?: Protocol[];
  isLoading: boolean;
}

const PriorityReviewQueue: React.FC<PriorityReviewQueueProps> = ({
  pendingProtocol,
  isLoading,
}) => {
  const [updateProtocol] = useUpdateProtocolStatusMutation();
  const submissions =
    pendingProtocol?.map((protocol) => ({
      id: protocol._id,
      title: protocol.protocolTitle,
      author: protocol.authors,
      submittedTime: new Date(protocol.createdAt).toLocaleDateString(),
      category: protocol.category,
      riskLevel: protocol.bslLevel,
      priority: protocol.status === "PENDING" ? "High Priority" : "",
      priorityColor:
        protocol.status === "PENDING" ? "bg-orange-100 text-orange-800" : "",
    })) || [];

  const getRiskLevelStyle = (riskLevel: string) => {
    switch (riskLevel) {
      case "IRB-1":
      case "IRB-2":
      case "IRB-3":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const updateStatus = async (protocolId: string) => {
    const id = toast.loading("Updating...");
    const formData = new FormData();
    formData.append("data", JSON.stringify({ status: "PUBLISHED" }));
    const result = await updateProtocol({
      data: formData,
      protocolId,
    })?.unwrap();
    if (result?.success) {
      toast.success(result?.message, { id });
    } else {
      toast.error(result?.message, { id });
    }
  };

  return (
    <div className="py-16 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Priority Review Queue
          </h1>
          <p className="text-gray-600">
            Submissions requiring immediate attention
          </p>
        </div>
        <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors">
          View All
        </button>
      </div>

      {/* Submissions List */}

      {isLoading ? (
        <div className="">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg p-4 bg-gray-200 animate-pulse w-full mx-auto mt-4"
            >
              <div className="flex space-x-4 py-4">
                {/* Text lines */}
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 shadow-sm">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              {/* Title and Priority */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight pr-4">
                  {submission.title}
                </h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevelStyle(
                      submission.riskLevel
                    )}`}
                  >
                    {submission.riskLevel}
                  </span>
                  {submission.priority && (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${submission.priorityColor}`}
                    >
                      {submission.priority}
                    </span>
                  )}
                </div>
              </div>

              {/* Submission Details */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    {submission?.author?.fullName}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    {submission?.submittedTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    {submission?.category}
                  </span>
                </div>
                {/* ----action button ---- */}
                <div className="flex items-center gap-4">
                  <Link
                    to={`/update-protocol/${submission.id}`}
                    title="Edit Protocol"
                  >
                    <Edit className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                  </Link>
                  <button
                    onClick={() => updateStatus(submission?.id)}
                    className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {submissions.length} of {submissions.length} priority
            submissions
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Bulk Review
            </button>
            <button className="px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200 transition-colors">
              Export Queue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityReviewQueue;
