import { Edit } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useUpdateProtocolStatusMutation } from "../../../redux/features/admindashboard/admindashboard";
import { useDeleteProtocolMutation } from "../../../redux/features/protocols/potocols.api";
import type { Protocol } from "../../../types/admindashboard.type";
import SectionHeader from "../../../utils/SectionHeading";

interface PriorityReviewQueueProps {
  pendingProtocol?: Protocol[];
  isLoading: boolean;
}

const PriorityReviewQueue: React.FC<PriorityReviewQueueProps> = ({
  pendingProtocol,
  isLoading,
}) => {
  const [updateProtocol] = useUpdateProtocolStatusMutation();
  const [deleteProtocolById] = useDeleteProtocolMutation()
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
  const deleteProtocol = async (protocolId: string) => {
    if (!window.confirm("Are you sure you want to delete this protocol?"))
      return;
    const id = toast.loading("Deleting...");
    const res = await deleteProtocolById(protocolId).unwrap();
    console.log(res)
    if (res?.success) {
      toast.success(res?.message, { id });
    } else {
      toast.error(res?.message, { id });
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <SectionHeader
          title="Priority Review Queue"
          subtitle="Submissions requiring immediate attention"
        />
        <Link to="/admin/protocols" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors">
          View All
        </Link>
      </div>

      {/* Submissions List */}
      {isLoading ? (
        <div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg p-4 bg-gray-200 animate-pulse w-full mx-auto mt-4"
            >
              <div className="flex space-x-4 py-4">
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
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">
                  {submission?.title}
                </h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevelStyle(
                      submission?.riskLevel
                    )}`}
                  >
                    {submission?.riskLevel}
                  </span>
                  {submission?.priority && (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${submission.priorityColor}`}
                    >
                      {submission?.priority}
                    </span>
                  )}
                </div>
              </div>

              {/* Submission Details */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
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
                <div className="flex items-center gap-3 sm:gap-4">
                  <Link
                    to={`/update-protocol/${submission.id}`}
                    title="Edit Protocol"
                  >
                    <Edit className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                  </Link>
                  <button
                    onClick={() => updateStatus(submission?.id)}
                    className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => deleteProtocol(submission?.id)}
                    className="bg-red-700 cursor-pointer hover:bg-emerald-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="text-xs sm:text-sm text-gray-600">
            Showing {submissions.length} of {submissions.length} priority
            submissions
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Bulk Review
            </button>
            <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200 transition-colors">
              Export Queue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityReviewQueue;
