import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetAllProtocolsQuery } from "../../../redux/features/protocols/potocols.api";
import type { Protocol } from "../../../types/potocols.type";
import SectionHeader from "../../../utils/SectionHeading";
import Loading from "../../../utils/Loading";

const LatestProtocols = () => {
  const { data, isLoading, isError } = useGetAllProtocolsQuery(undefined);
  const protocols: Protocol[] = data?.data?.slice(0, 6) || [];
  if (isError)
    return (
      <div className="text-red-600 grid text-center">
        <Loading></Loading>
        <p>Error loading protocols. Please try again.</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <SectionHeader
        title="Latest Protocols"
        subtitle="Recently reviewed and published protocols from our community of rese"
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-full rounded-lg">
              <div className="w-full h-80 bg-gray-300 rounded-lg flex items-end p-2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {protocols.map((protocol) => (
            <div
              key={protocol._id}
              className="bg-[#F5F5F7] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col h-full"
            >
              {/* Header with techniques and BSL */}
              <div className="p-4 flex justify-between items-center">
                {/* Techniques */}
                <div className="flex flex-wrap gap-2">
                  {protocol.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[#DDE9E5] text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* BSL Badge */}
                {protocol.bslLevel && (
                  <div className="w-16 bg-[#F8E0DF] text-[#FF3B30] p-2 rounded-md text-xs font-medium">
                    {protocol.bslLevel}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-3 leading-tight">
                  {protocol.protocolTitle}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {protocol.protocolDescription?.slice(0, 120)}...
                </p>

                {/* Time and Level */}
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-[#636363] text-xs font-medium">
                    {protocol.estimatedTime || "N/A"}
                  </span>

                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      protocol.difficulty === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : protocol.difficulty === "Hard"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {protocol.difficulty}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4 mt-2">
                  {protocol.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Button pinned bottom */}
              <Link to={`/protocol/${protocol._id}`} className="mt-auto">
                <div className="px-6 py-4">
                  <button className="w-full py-3 px-4 bg-[#17AA80] hover:bg-[#148f68] text-white font-medium rounded-md transition-colors duration-200 text-sm">
                    View Protocol
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* See more button */}
      <div className="mt-8 text-center">
        <Link to="/protocol">
          <button className="gap-2 px-7 py-4 border border-[#17AA80] rounded-lg text-[#17AA80] font-normal hover:bg-[#17AA80] hover:text-white transition-colors duration-200">
            See More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LatestProtocols;
