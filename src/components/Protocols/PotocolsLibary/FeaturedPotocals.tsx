import { Link } from "react-router-dom";
import SectionHeader from "../../../utils/SectionHeading";
import { useGetAllProtocolsQuery } from "../../../redux/features/protocols/potocols.api";

// ------------------ API INTERFACE ------------------
export interface ApiProtocol {
  _id: string;
  protocolTitle: string;
  protocolDescription: string;
  tags: string[];
  estimatedTime: string;
  difficulty: string;
  authors: string[]; 
  attachment?: string;
  createdAt: string;
  updatedAt: string;
}

// ------------------ UI INTERFACE ------------------
interface UiProtocol {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    image: string;
    affiliation: string;
  };
  tags: string[];
  image?: string;
  difficulty?: string;
  estimatedTime?: string;
  techniques?: string;
}

// ------------------ FALLBACK DEMO DATA ------------------
const featuredProtocols: UiProtocol[] = [
  {
    id: "1",
    title: "Editor Pick: Next-Gen CAR-T Manufacturing",
    description:
      "Next-Generation CAR-T Manufacturing with 2x higher expansion rates and enhanced persistence.",
    author: {
      name: "Dr. Sarah Chen",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      affiliation: "MD Anderson Cancer Center",
    },
    tags: ["CAR-T", "Manufacturing", "Automated"],
    image: "https://via.placeholder.com/300x200?text=CAR-T+Protocol",
    difficulty: "Medium",
    estimatedTime: "3-5 Days",
    techniques: "Editor's Pick",
  },
];

// ------------------ COMPONENT ------------------
const FeaturedProtocols = () => {
  const { data, isLoading, isError } = useGetAllProtocolsQuery(undefined);

  // Map API response -> UI shape
  const apiProtocols: UiProtocol[] =
    data?.data?.slice(0, 2).map((p: ApiProtocol) => ({
      id: p._id,
      title: p.protocolTitle,
      description: p.protocolDescription,
      author: {
        name: p.authors?.[0] || "Unknown Author",
        image: "https://via.placeholder.com/40?text=A", // fallback avatar
        affiliation: "Unknown Affiliation", // backend doesn’t provide yet
      },
      tags: p.tags || [],
      image: p.attachment,
      difficulty: p.difficulty,
      estimatedTime: p.estimatedTime,
      techniques: "Latest", // mark API ones differently
    })) || [];

  // Use API if available, else fallback
  const protocols = apiProtocols.length > 0 ? apiProtocols : featuredProtocols;

  if (isLoading) return <p className="text-center">Loading protocols...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load protocols.</p>
    );

  return (
    <div className="py-10 px-4">
      <SectionHeader
        title="Featured Protocols"
        subtitle="Editor picks and most downloaded protocols this month"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {protocols.map((protocol) => (
          <div
            key={protocol.id}
            className="bg-[#F5F5F7] rounded-xl p-8 shadow-md transition"
          >
            {/* Top badges */}
            <div className="p-4 flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {protocol.techniques && (
                  <p className="px-3 py-1 rounded-full text-xs font-medium bg-[#DDE9E5] text-black">
                    {protocol.techniques}
                  </p>
                )}
              </div>
              <div className="inline-block bg-[#F8E0DF] text-[#FF3B30] px-2 py-1 rounded-full text-xs font-medium">
                BSL-2
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {protocol.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
              {protocol.description}
            </p>

            {/* Difficulty + time */}
            <div className="flex flex-wrap gap-2 mb-3">
              {protocol.difficulty && (
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {protocol.difficulty}
                </span>
              )}
              {protocol.estimatedTime && (
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {protocol.estimatedTime}
                </span>
              )}
            </div>

            {/* Tags + author */}
            <div className="flex justify-between">
              <div className="flex flex-wrap gap-2 mb-4">
                {protocol.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#EDEDEF] text-black text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center mb-3">
                <img
                  src={protocol.author.image}
                  alt={protocol.author.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {protocol.author.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {protocol.author.affiliation}
                  </p>
                </div>
              </div>
            </div>

            {/* Button */}
            <Link to={`/protocol-details/${protocol.id}`}>
              <button className="cursor-pointer w-full bg-[#17AA80] text-white py-2 px-4 rounded hover:bg-green-700 transition">
                View Protocol
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProtocols;
