import { useState } from "react";
import { Eye, Send, Trash2 } from "lucide-react";

interface Draft {
  id: number;
  title: string;
  description: string;
  lastSaved: string;
  wordCount: number;
}

export default function DraftProtocols() {
  const [drafts] = useState<Draft[]>([
    {
      id: 1,
      title: "Advanced PCR Amplification Techniques",
      description:
        "Comprehensive protocol covering various PCR optimization strategies including gradient PCR, hot-start PCR, and troubleshooting common amplification issues...",
      lastSaved: "2 hours ago",
      wordCount: 2847,
    },
    {
      id: 2,
      title: "Bacterial Transformation Protocol",
      description:
        "Step-by-step guide for chemical transformation of competent bacterial cells using calcium chloride method...",
      lastSaved: "1 day ago",
      wordCount: 2847,
    },
    {
      id: 3,
      title: "RNA Extraction from Plant Tissue",
      description:
        "Modified CTAB method for extracting high-quality RNA from various plant tissues with high polyphenol content...",
      lastSaved: "1 day ago",
      wordCount: 2847,
    },
  ]);

  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selected.length === drafts.length) {
      setSelected([]);
    } else {
      setSelected(drafts.map((d) => d.id));
    }
  };

  return (
    <div className=" p-6 py-15">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          <span className="  pb-1">
            My Draft Protocols
          </span>
        </h1>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={selected.length === drafts.length}
            onChange={selectAll}
            className="w-4 h-4 rounded border-gray-400"
          />
          Select All
        </label>
      </div>

      {/* Drafts List */}
      <div className="space-y-4">
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="bg-white border rounded-lg shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition"
          >
            <input
              type="checkbox"
              checked={selected.includes(draft.id)}
              onChange={() => toggleSelect(draft.id)}
              className="mt-1 w-5 h-5 text-blue-600 border-gray-400 rounded"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-lg">{draft.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{draft.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Last saved: {draft.lastSaved} • Word count: {draft.wordCount}
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
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <p>Showing {drafts.length} of 7 drafts</p>
        <button className="text-[#4A7BFF] hover:underline">View All Drafts</button>
      </div>
    </div>
  );
}
