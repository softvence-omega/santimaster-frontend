import React, { useState, useMemo } from "react";
import { Eye, Trash2 } from "lucide-react";
import {
  useGetUserDashboardQuery,
  useDeleteProtocolMutation,
} from "../../../redux/features/userdasboad/userdashboard";
import SkeletonLoader from "../../../shared/SkeletonLoader";
import { Link } from "react-router-dom";

interface Draft {
  _id: string;
  protocolTitle: string;
  protocolDescription: string;
  createdAt: string;
}

const DraftProtocols: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Fetch protocols using useGetUserDashboardQuery
  const {
    data: dashboardData,
    isLoading,
    error,
    refetch,
  } = useGetUserDashboardQuery();

  const [deleteProtocol] = useDeleteProtocolMutation();

  // Extract draft protocols with memoization
  const drafts: Draft[] = useMemo(
    () => dashboardData?.data?.protocols?.draft ?? [],
    [dashboardData]
  );

  // Debugging logs
  console.log("Fetched drafts:", drafts);
  console.log("Selected drafts:", selected);

  // Handle delete protocol
  const handleDelete = async (id: string) => {
    try {
      await deleteProtocol(id).unwrap();
      setMessage({ type: "success", text: "Protocol deleted successfully" });
      refetch(); // Refresh the draft list
      setSelected((prev) => prev.filter((x) => x !== id));
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Delete error:", err);
      setMessage({
        type: "error",
        text:
          (err as { data?: { message?: string } })?.data?.message ||
          "Failed to delete protocol",
      });
      setTimeout(() => setMessage(null), 3000);
    }
  };

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
              "Failed to load drafts"
            : "An error occurred while fetching drafts. Please try again."}
        </p>
      </div>
    );
  }

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selected.length === drafts.length) {
      setSelected([]);
    } else {
      setSelected(drafts.map((d) => d._id));
    }
  };

  return (
    <div className="p-6 py-15 max-w-5xl mx-auto">
      {/* Feedback Message */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          <span className="pb-1">My Draft Protocols</span>
        </h1>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={drafts.length > 0 && selected.length === drafts.length}
            onChange={selectAll}
            className="w-4 h-4 rounded border-gray-400"
          />
          Select All
        </label>
      </div>

      {/* Drafts List */}
      <div className="space-y-4">
        {drafts.length === 0 ? (
          <p className="text-gray-500 text-sm">No drafts available</p>
        ) : (
          drafts.map((draft) => (
            <div
              key={draft._id}
              className="bg-white border rounded-lg shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition"
            >
              <input
                type="checkbox"
                checked={selected.includes(draft._id)}
                onChange={() => toggleSelect(draft._id)}
                className="mt-1 w-5 h-5 text-blue-600 border-gray-400 rounded"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{draft.protocolTitle}</h2>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {draft.protocolDescription}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Last saved: {new Date(draft.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <Link
                  to={`/protocol/${draft._id}`}
                  className="flex items-center gap-1 px-3 py-1 text-sm border rounded-lg hover:bg-gray-100"
                >
                  <Eye size={16} /> Preview
                </Link>

                <button
                  onClick={() => handleDelete(draft._id)}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <p>Showing {drafts.length} draft(s)</p>
        <button className="text-[#4A7BFF] hover:underline">
          View All Drafts
        </button>
      </div>
    </div>
  );
};

export default DraftProtocols;
