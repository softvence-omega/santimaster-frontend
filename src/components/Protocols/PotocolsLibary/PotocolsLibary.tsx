/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock, Search, Upload, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useGetAllProtocolsQuery } from "../../../redux/features/protocols/potocols.api";
import SkeletonLoader from "../../../shared/SkeletonLoader";

interface FilterCategory {
  name: string;
  options: {
    label: string;
    value: string;
    selected: boolean;
  }[];
}

const FilterCheckbox: React.FC<{
  label: string;
  value: string;
  selected: boolean;
  onChange: (value: string, selected: boolean) => void;
}> = ({ label, value, selected, onChange }) => {
  return (
    <label className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onChange(value, e.target.checked)}
          className="mr-2 rounded"
        />
        <span className="text-sm text-gray-700">{label}</span>
      </div>
    </label>
  );
};

const PotocolsLibary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const protocolsPerPage = 6;

  // Static filter options
  const staticFilterCategories: FilterCategory[] = [
    {
      name: "Technique",
      options: [
        { label: "CRISPR/Cas9", value: "CRISPR/Cas9", selected: false },
        { label: "Base Editing", value: "Base Editing", selected: false },
        { label: "Prime Editing", value: "Prime Editing", selected: false },
        { label: "CAR-T", value: "CAR-T", selected: false },
        { label: "Aseptic Technique", value: "Aseptic Technique", selected: false },
      ],
    },
    {
      name: "Category",
      options: [
        { label: "Gene Editing", value: "Gene Editing", selected: false },
        { label: "Cell Therapy", value: "Cell Therapy", selected: false },
        { label: "Molecular Biology", value: "Molecular Biology", selected: false },
        { label: "Immunotherapy", value: "Immunotherapy", selected: false },
        { label: "Cell Biology", value: "Cell Biology", selected: false },
      ],
    },
    {
      name: "Phase",
      options: [
        { label: "Phase I", value: "Phase I", selected: false },
        { label: "Phase II", value: "Phase II", selected: false },
        { label: "Phase III", value: "Phase III", selected: false },
      ],
    },
    {
      name: "Difficulty",
      options: [
        { label: "Easy", value: "Easy", selected: false },
        { label: "Medium", value: "Medium", selected: false },
        { label: "Hard", value: "Hard", selected: false },
      ],
    }
  ];

  // Prepare query parameters for API
  const queryParams = useMemo(() => {
    const params: { name: string; value: string }[] = [];
    Object.entries(activeFilters).forEach(([category, values]) => {
      values.forEach((value) => {
        params.push({ name: category, value });
      });
    });
    return params.length > 0 ? params : undefined;
  }, [activeFilters]);

  // Fetch protocols from API
  const { data ,isLoading} = useGetAllProtocolsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });
  const protocols = data?.data || [];
  const meta = data?.meta || { total: 0, page: 1, limit: protocolsPerPage };

  const filteredProtocols = useMemo(() => {
    return protocols
      .filter((protocol) =>
        protocol.protocolTitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(
        (currentPage - 1) * protocolsPerPage,
        currentPage * protocolsPerPage
      );
  }, [protocols, searchQuery, currentPage]);

  // Update filter counts dynamically
  const filterCategories: FilterCategory[] = useMemo(() => {
    const updatedCategories = staticFilterCategories.map((category) => ({
      ...category,
      options: category.options.map((option) => {
        let count = 0;
        if (category.name === "Additional Options") {
          if (option.value === "attachment") {
            count = protocols.filter((p) => p.attachment).length;
          } else if (option.value === "doiLink") {
            count = protocols.filter((p) => p.doiLink).length;
          }
        } else {
          count = protocols.filter(
            (p) => (p as any)[category.name.toLowerCase()] === option.value
          ).length;
        }
        return {
          ...option,
          count,
          selected:
            activeFilters[category.name.toLowerCase()]?.includes(
              option.value
            ) || false,
        };
      }),
    }));
    return updatedCategories;
  }, [protocols, activeFilters]);

  // Update filters
  const updateFilter = (category: string, value: string, selected: boolean) => {
    setActiveFilters((prev) => {
      const current = prev[category.toLowerCase()] || [];
      if (selected) {
        return { ...prev, [category.toLowerCase()]: [...current, value] };
      } else {
        return {
          ...prev,
          [category.toLowerCase()]: current.filter((v) => v !== value),
        };
      }
    });
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Clear a specific filter
  const clearFilter = (category: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[category.toLowerCase()] || [];
      return {
        ...prev,
        [category.toLowerCase()]: current.filter((v) => v !== value),
      };
    });
    setCurrentPage(1);
  };

  // Generate pagination buttons
  const totalPages = Math.ceil(
    (meta.total || protocols.length) / protocolsPerPage
  );
  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);
  console.log("activeFilters", Object.entries(activeFilters).length);

  return (
    <div className="min-h-screen py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-2xl items-start">
          <div className="flex flex-wrap items-center gap-3 py-3 rounded-lg">
            {Object.entries(activeFilters).length > 0 && (
              <h3 className="font-medium text-gray-900 flex-shrink-0">
                Active filters:
              </h3>
            )}

            {Object.entries(activeFilters).flatMap(([category, values]) =>
              values.map((value) => ( <button key={`${category}-${value}`}
                 className="flex items-center gap-2 bg-[#DDE9E5] px-3 py-1 rounded-[16px] text-black hover:bg-blue-100"
                  onClick={() => clearFilter(category, value)}
                >
                  <span>{value}</span>
                  <X className="w-4 h-4" />
                </button>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none focus:border-transparent"
                  aria-label="Search protocols by title"
                />
              </div>
              <Link
                to="/submit-protocol"
                className=" flex justify-center items-center border border-[#17AA80] text-[#17AA80] hover:bg-[#17AA80] hover:text-white rounded-md px-2 text-sm"
              >
                <Upload />
                Upload New
              </Link>
            </div>
            {filterCategories.map((category) => (
              <div
                key={category.name}
                className="bg-white p-4 rounded-lg shadow"
              >
                <h3 className="font-medium text-gray-900 mb-3">
                  {category.name}
                </h3>
                <div className="space-y-1">
                  {category.options.map((option) => (
                    <FilterCheckbox
                      key={option.value}
                      {...option}
                      onChange={(value, selected) =>
                        updateFilter(
                          category.name.toLowerCase(),
                          value,
                          selected
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* All Protocols */}
            <div>
              {
                isLoading? <SkeletonLoader /> :
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {filteredProtocols.map((protocol) => (
                      <div
                        key={protocol._id.toString()}
                        className="bg-[#F5F5F7] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col"
                      >
                        {/* Header with techniques and BSL Level */}
                        <div className="p-4 flex justify-between items-center">
                          <div className="flex flex-wrap gap-2">
                            {protocol.technique && (
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#DDE9E5] text-black">
                                {protocol.technique}
                              </span>
                            )}
                          </div>
                          <div className="inline-block bg-[#F8E0DF] text-[#FF3B30] px-2 py-1 rounded-full text-xs font-medium">
                            {protocol.bslLevel || "Unknown"}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1">
                          <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
                            {protocol.protocolTitle}
                          </h3>
                          <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                            {protocol.protocolDescription?.slice(0, 100) || "No description available"} ....
                          </p>

                          {/* Time and Difficulty */}
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-[#636363] text-xs font-medium">
                              {protocol.estimatedTime || "Unknown"}
                            </span>
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${protocol.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : protocol.difficulty === "Hard"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                                }`}
                            >
                              {protocol.difficulty || "Unknown"}
                            </span>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4 mt-2">
                            {protocol.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Footer with button (fixed at bottom) */}
                        <div className="px-6 py-4 mt-auto">
                          <Link to={`/protocol/${protocol._id}`}>
                            <button className="w-full py-3 px-4 bg-[#17AA80] hover:bg-[#148f68] text-white font-medium rounded-md transition-colors duration-200 text-sm">
                              View Protocol
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
              }




              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Previous
                  </button>
                  {paginationButtons.map((page) => (
                    <button
                      key={page}
                      className={`px-3 py-2 border border-gray-300 rounded ${currentPage === page ? "bg-[#1D6953] text-white" : ""
                        }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PotocolsLibary;
