import { useState } from "react";
import { Eye, Send, Trash2 } from "lucide-react";

interface Draft {
  _id: string;
  protocolTitle: string;
  protocolDescription: string;
  createdAt: string;
}

interface DraftProtocolsProps {
  drafts?: Draft[];
}

export default function DraftProtocols({ drafts = [] }: DraftProtocolsProps) {
  const [selected, setSelected] = useState<string[]>([]);

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
                <button className="flex items-center gap-1 px-3 py-1 text-sm border rounded-lg hover:bg-gray-100">
                  <Eye size={16} /> Preview
                </button>
                <button className="flex items-center gap-1 px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  <Send size={16} /> Submit
                </button>
                <button className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
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
}
