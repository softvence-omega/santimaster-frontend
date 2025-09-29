
import { useState, useMemo } from "react";
import { Clock, Search, X } from "lucide-react";
import { Link } from "react-router-dom";

import SectionHeader from "../../../utils/SectionHeading";
import FeaturedPotocals from "./FeaturedPotocals";
import { useGetAllProtocolsQuery } from "../../../redux/features/protocols/potocols.api";


interface FilterCategory {
  name: string;
  options: {
    label: string;
    value: string;
    count: number;
    selected: boolean;
  }[];
}

const FilterCheckbox: React.FC<{
  label: string;
  value: string;
  count: number;
  selected: boolean;
  onChange: (value: string, selected: boolean) => void;
}> = ({ label, value, count, selected, onChange }) => {
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
      <span className="text-xs text-gray-500">({count})</span>
    </label>
  );
};

const PotocolsLibary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string[] }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const protocolsPerPage = 6;

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
  const { data, isLoading, isError } = useGetAllProtocolsQuery(queryParams);
  const protocols = data?.data || [];
  const meta = data?.meta || { total: 0, page: 1, limit: protocolsPerPage };

  // Filter protocols by search query (client-side)
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

  // Generate dynamic filter categories
  const filterCategories: FilterCategory[] = useMemo(() => {
    const categories: FilterCategory[] = [
      {
        name: "Technique",
        options: [],
      },
      {
        name: "Organism",
        options: [],
      },
      {
        name: "Phase",
        options: [],
      },
      {
        name: "Difficulty",
        options: [],
      },
      {
        name: "Estimated Time",
        options: [],
      },
      {
        name: "Additional Options",
        options: [
          { label: "Has Files", value: "attachment", count: 0, selected: false },
          { label: "Has DOI", value: "doiLink", count: 0, selected: false },
        ],
      },
    ];

    // Count unique values for each filter category
    const techniqueSet = new Set<string>();
    const organismSet = new Set<string>();
    const phaseSet = new Set<string>();
    const difficultySet = new Set<string>();
    const estimatedTimeSet = new Set<string>();
    let attachmentCount = 0;
    let doiLinkCount = 0;

    protocols.forEach((protocol) => {
      if (protocol.technique) techniqueSet.add(protocol.technique);
      if (protocol.organism) organismSet.add(protocol.organism);
      if (protocol.phase) phaseSet.add(protocol.phase);
      if (protocol.difficulty) difficultySet.add(protocol.difficulty);
      if (protocol.estimatedTime) estimatedTimeSet.add(protocol.estimatedTime);
      if (protocol.attachment) attachmentCount++;
      if (protocol.doiLink) doiLinkCount++;
    });

    categories[0].options = Array.from(techniqueSet).map((value) => ({
      label: value,
      value,
      count: protocols.filter((p) => p.technique === value).length,
      selected: activeFilters["technique"]?.includes(value) || false,
    }));

    categories[1].options = Array.from(organismSet).map((value) => ({
      label: value,
      value,
      count: protocols.filter((p) => p.organism === value).length,
      selected: activeFilters["organism"]?.includes(value) || false,
    }));

    categories[2].options = Array.from(phaseSet).map((value) => ({
      label: value,
      value,
      count: protocols.filter((p) => p.phase === value).length,
      selected: activeFilters["phase"]?.includes(value) || false,
    }));

    categories[3].options = Array.from(difficultySet).map((value) => ({
      label: value,
      value,
      count: protocols.filter((p) => p.difficulty === value).length,
      selected: activeFilters["difficulty"]?.includes(value) || false,
    }));

    categories[4].options = Array.from(estimatedTimeSet).map((value) => ({
      label: value,
      value,
      count: protocols.filter((p) => p.estimatedTime === value).length,
      selected: activeFilters["estimatedTime"]?.includes(value) || false,
    }));

    categories[5].options = [
      { label: "Has Files", value: "attachment", count: attachmentCount, selected: activeFilters["attachment"]?.includes("true") || false },
      { label: "Has DOI", value: "doiLink", count: doiLinkCount, selected: activeFilters["doiLink"]?.includes("true") || false },
    ];

    return categories;
  }, [protocols, activeFilters]);

  // Update filters
  const updateFilter = (category: string, value: string, selected: boolean) => {
    setActiveFilters((prev) => {
      const current = prev[category.toLowerCase()] || [];
      if (selected) {
        return { ...prev, [category.toLowerCase()]: [...current, value] };
      } else {
        return { ...prev, [category.toLowerCase()]: current.filter((v) => v !== value) };
      }
    });
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Clear a specific filter
  const clearFilter = (category: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[category.toLowerCase()] || [];
      return { ...prev, [category.toLowerCase()]: current.filter((v) => v !== value) };
    });
    setCurrentPage(1);
  };

  // Generate pagination buttons
  const totalPages = Math.ceil((meta.total || protocols.length) / protocolsPerPage);
  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-white py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading and Search Bar */}
        <div className="max-w-2xl items-start">
          <SectionHeader
            title="Protocol Library"
            subtitle="Browse peer-reviewed protocols by technique, modality, organism, and phase."
          />

          {/* Search Bar */}
          <div className="mb-6 w-80 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              aria-label="Search protocols by title"
            />
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-lg">
            <h3 className="font-medium text-gray-900 flex-shrink-0">Active filters:</h3>
            {Object.entries(activeFilters).flatMap(([category, values]) =>
              values.map((value) => (
                <button
                  key={`${category}-${value}`}
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

        {/* Filter and Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
            {filterCategories.map((category) => (
              <div key={category.name} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-gray-900 mb-3">{category.name}</h3>
                <div className="space-y-1">
                  {category.options.map((option) => (
                    <FilterCheckbox
                      key={option.value}
                      {...option}
                      onChange={(value, selected) => updateFilter(category.name.toLowerCase(), value, selected)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <FeaturedPotocals />

            {/* All Protocols */}
            <div>
              <SectionHeader
                title="All Protocols"
                subtitle="Browse peer-reviewed protocols by technique, modality, organism, and phase."
              />

              {isLoading && <p className="text-gray-600">Loading protocols...</p>}
              {isError && <p className="text-red-600">Error loading protocols. Please try again.</p>}
              {!isLoading && !isError && filteredProtocols.length === 0 && (
                <p className="text-gray-600">No protocols found.</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredProtocols.map((protocol) => (
                  <div
                    key={protocol._id.toString()}
                    className="bg-[#F5F5F7] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200"
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
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
                        {protocol.protocolTitle}
                      </h3>
                      <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                        {protocol.protocolDescription}
                      </p>

                      {/* Time and Difficulty */}
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-[#636363] text-xs font-medium">
                          {protocol.estimatedTime || "Unknown"}
                        </span>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            protocol.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : protocol.difficulty === "Hard"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {protocol.difficulty || "Unknown"}
                        </span>
                      </div>

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

                    {/* Footer with button */}
                    <div className="px-6 py-4">
                      <Link to={`/protocol-details/${protocol._id}`}>
                        <button className="w-full py-3 px-4 bg-[#17AA80] hover:bg-[#148f68] text-white font-medium rounded-md transition-colors duration-200 text-sm">
                          View Protocol
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

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
                      className={`px-3 py-2 border border-gray-300 rounded ${
                        currentPage === page ? "bg-[#1D6953] text-white" : ""
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
