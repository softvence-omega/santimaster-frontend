import React, { useState } from "react";
import {
  useGetMessagesQuery,
  useDeleteMessageMutation,
} from "../../../redux/features/contract/contract.api";
import { toast } from "react-hot-toast";
import SkeletonLoader from "../../../shared/SkeletonLoader";

const MessagesTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 5; // messages per page

  const { data: messages = [], isLoading, isError } = useGetMessagesQuery();

  const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    try {
      await deleteMessage(id).unwrap();
      toast.success("Message deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete message");
    }
  };

  // Pagination calculations
  const totalMessages = messages.length;
  const totalPages = Math.ceil(totalMessages / limit);
  const paginatedMessages = messages.slice((page - 1) * limit, page * limit);

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "file";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading)
    return (
      <div className="p-4 text-gray-500">
        <SkeletonLoader />
      </div>
    );

  if (isError)
    return <div className="p-4 text-red-500">Failed to load messages.</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm overflow-x-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Messages</h2>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Email
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Subject
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Message
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Attachment
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Created At
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {paginatedMessages.map((msg) => (
            <tr key={msg._id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3 text-sm text-gray-900">
                {msg.fullName}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">{msg.email}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{msg.subject}</td>
              <td className="px-4 py-3 text-sm text-gray-900 truncate max-w-xs">
                {msg.message}
              </td>
              <td className="px-4 py-3 text-sm text-blue-600">
                {msg.attachments ? (
                  <button
                    onClick={() => handleDownload(msg.attachments!)}
                    className="underline hover:text-blue-800"
                  >
                    Download
                  </button>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {new Date(msg.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => handleDelete(msg._id)}
                  disabled={isDeleting}
                  className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {paginatedMessages.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No messages found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2 text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MessagesTable;
