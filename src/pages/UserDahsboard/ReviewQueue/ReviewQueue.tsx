import React, { useState, useMemo } from "react";
import { ChevronDown, User } from "lucide-react";
import type { Protocol } from "../../../types/userdashboard.type";

// ✅ Filter Dropdown
const FilterDropdown: React.FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}> = ({ value, options, onChange }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
  </div>
);

// ✅ BSL Badge
const BSLBadge: React.FC<{ level: number }> = ({ level }) => (
  <span
    className={`px-2 py-1 rounded text-xs font-medium ${
      level === 1
        ? "bg-green-100 text-green-700"
        : level === 2
        ? "bg-yellow-100 text-yellow-700"
        : level === 3
        ? "bg-orange-100 text-orange-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    BSL-{level}
  </span>
);

// ✅ Status Badge
const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span
    className={`px-2 py-1 rounded text-xs font-medium ${
      status.toLowerCase() === "pending"
        ? "bg-yellow-100 text-yellow-700"
        : status.toLowerCase() === "published"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {status}
  </span>
);

// ✅ Review Item
const ReviewItem: React.FC<{
  title: string;
  description: string;
  reviewer: { name: string };
  priority: string;
  submitted: string;
  bslLevel: number;
  status: string;
  dueDate?: string;
}> = ({
  title,
  description,
  reviewer,

  submitted,
  bslLevel,
  status,
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{reviewer.name}</span>
          </div>
          <span>Submitted: {submitted}</span>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <BSLBadge level={bslLevel} />
        <StatusBadge status={status} />
      </div>
    </div>
  </div>
);

// ✅ Review Queue Component
interface ReviewQueueProps {
  queue: Protocol[];
}

const ReviewQueue: React.FC<ReviewQueueProps> = ({ queue }) => {
  // 🔹 filter states
  const [protocolType, setProtocolType] = useState("All Protocols");
  const [bslFilter, setBslFilter] = useState("All Levels");
  const [difficulty, setDifficulty] = useState("All Levels");

  // 🔹 derive filtered list
  const filteredQueue = useMemo(() => {
    return queue.filter((protocol) => {
      let matches = true;

      if (
        protocolType !== "All Protocols" &&
        protocol.category !== protocolType
      ) {
        matches = false;
      }

      if (
        bslFilter !== "All Levels" &&
        `BSL-${protocol.bslLevel}` !== bslFilter
      ) {
        matches = false;
      }

      if (difficulty !== "All Levels" && protocol.difficulty !== difficulty) {
        matches = false;
      }

      return matches;
    });
  }, [queue, protocolType, bslFilter, difficulty]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Review Queue</h1>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          {filteredQueue.length} protocols awaiting review
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <span className="text-sm text-gray-600 font-medium">
          Protocol Type:
        </span>
        <FilterDropdown
          label="Protocol Type"
          value={protocolType}
          options={[
            "All Protocols",
            ...Array.from(new Set(queue.map((p) => p.category))),
          ]}
          onChange={setProtocolType}
        />

        <span className="text-sm text-gray-600 font-medium">BSL Level:</span>
        <FilterDropdown
          label="BSL Level"
          value={bslFilter}
          options={[
            "All Levels",
            ...Array.from(new Set(queue.map((p) => `BSL-${p.bslLevel}`))),
          ]}
          onChange={setBslFilter}
        />

        <span className="text-sm text-gray-600 font-medium">Difficulty:</span>
        <FilterDropdown
          label="Difficulty"
          value={difficulty}
          options={[
            "All Levels",
            ...Array.from(new Set(queue.map((p) => p.difficulty))),
          ]}
          onChange={setDifficulty}
        />
      </div>

      {/* Render filtered data */}
      <div className="space-y-4">
        {filteredQueue.length > 0 ? (
          filteredQueue.map((protocol) => (
            <ReviewItem
              key={protocol._id}
              title={protocol.protocolTitle}
              description={protocol.protocolDescription}
              reviewer={{ name: "Reviewer Pending" }}
              priority={"High"} // could be mapped from difficulty
              submitted={new Date(protocol.createdAt).toLocaleDateString()}
              bslLevel={parseInt(protocol.bslLevel)}
              status={protocol.status}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No matching protocols</p>
        )}
      </div>
    </div>
  );
};

export default ReviewQueue;
