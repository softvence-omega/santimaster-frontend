import { Link } from "react-router-dom";
import SectionHeader from "../../../utils/SectionHeading";

interface Protocol {
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

const featuredProtocols: Protocol[] = [
  {
    id: "1",
    title: "Editor Pick: Next-Gen CAR-T Manufacturing",
    description:
      "Next-Generation CAR-T Manufacturing with 2x higher expansion rates and enhanced persistence. Includes automated bioprocess protocols and quality control.",
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
  {
    id: "2",
    title: "High-Throughput CRISPR Screening in 96-Well Format",
    description:
      "Rapid CRISPR Screening protocol in 96-Well Format optimized for functional genomics studies. Includes automated liquid handling and genomic analysis pipelines.",
    author: {
      name: "Dr. Emily ",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      affiliation: "Broad Institute",
    },
    tags: ["CRISPR", "Screening", "High-Throughput"],
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    difficulty: "Hard",
    estimatedTime: "9-10 Days",
    techniques: "Editor's Pick",
  },
];

const FeaturedProtocols = () => {
  return (
    <div className="py-10 px-4  ">
      <SectionHeader
        title=" Featured Protocols"
        subtitle="Editor picks and most downloaded protocols this month"
      ></SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ]">
        {featuredProtocols.map((protocol) => (
          <div
            key={protocol.id}
            className="bg-[#F5F5F7 rounded-xl p-8  shadow-md transition"
          >
            <div className="p-4 flex justify-between items-center">
              {/* ------------Techniques ---------------*/}
              <div className="flex flex-wrap gap-2">
                <p className="px-3 py-1 rounded-full text-xs font-medium bg-[##DDE9E5  ] text-black">
                  {" "}
                  {protocol.techniques}
                </p>
              </div>

              {/*------------- BSL-2 Badge -------------*/}
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
            {/* ------------auth image & tag--- */}
            <div className="flex justify-between">
              <div className="flex flex-wrap gap-2 mb-4">
                {protocol.tags.map((tag, index) => (
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
            {/* ----------button-------------- */}
            <Link to="/protocol-details">
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
