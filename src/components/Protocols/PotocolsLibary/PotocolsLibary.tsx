import { useState } from "react";

import FeaturedPotocals from "./FeaturedPotocals";
import { Clock, Search, X } from "lucide-react";

import SectionHeader from "../../../utils/SectionHeading";

// Define types for protocols
interface Protocol {
  id: number;
  title: string;
  subtitle: string;
  techniques: string[];
  time: string;
  level: string;
  tags: string[];
  buttonText: string;
}

// Define types for filters
interface FilterCategory {
  name: string;
  options: {
    label: string;
    value: string;
    count: number;
    selected: boolean;
  }[];
}

const mockProtocols: Protocol[] = [
  {
    id: 1,
    title: "CRISPR-Cas9 Gene Editing in Human iPSCs",
    subtitle:
      "A comprehensive protocol for precise gene editing in induced pluripotent stem cells using CRISPR-Cas9 technology with optimized...",
    techniques: ["CRISPR", "Mammalian"],
    time: "4-6 hours",
    level: "Medium",
    tags: ["Gene Editing", "Stem Cells", "Transfection"],
    buttonText: "View Protocol",
  },
  {
    id: 2,
    title: "mRNA Vaccine Production",
    subtitle:
      "Step-by-step guide for synthesizing mRNA vaccines using in vitro transcription and lipid nanoparticle encapsulation.",
    techniques: ["RNA", "Human"],
    time: "8-12 hours",
    level: "Hard",
    tags: ["Vaccinology", "Synthesis", "Nanoparticles"],
    buttonText: "View Protocol",
  },
  {
    id: 3,
    title: "Single-Cell RNA Sequencing",
    subtitle:
      "Detailed workflow for library preparation and sequencing of single-cell transcriptomes with high sensitivity.",
    techniques: ["Sequencing", "Mammalian"],
    time: "2-3 days",
    level: "Medium",
    tags: ["Genomics", "Single-Cell", "Transcriptomics"],
    buttonText: "View Protocol",
  },
  {
    id: 4,
    title: "Protein Purification (His-Tag)",
    subtitle:
      "Optimized method for affinity purification of His-tagged recombinant proteins from bacterial lysates.",
    techniques: ["Affinity", "Bacterial"],
    time: "6-8 hours",
    level: "Easy",
    tags: ["Protein Chemistry", "Purification", "Affinity"],
    buttonText: "View Protocol",
  },
  {
    id: 5,
    title: "Organoid Culture Protocol",
    subtitle:
      "Protocol for generating and maintaining 3D organoids from mammalian stem cells for disease modeling.",
    techniques: ["3D Culture", "Mammalian"],
    time: "7-14 days",
    level: "Medium",
    tags: ["Cell Culture", "Organoids", "Modeling"],
    buttonText: "View Protocol",
  },
  {
    id: 6,
    title: "Flow Cytometry Immune Profiling",
    subtitle:
      "Multicolor flow cytometry protocol for analyzing immune cell populations in human samples.",
    techniques: ["Flow", "Human"],
    time: "4-6 hours",
    level: "Hard",
    tags: ["Cytometry", "Immune", "Profiling"],
    buttonText: "View Protocol",
  },
];

// Filter categories sample data
const filterCategories: FilterCategory[] = [
  {
    name: "Technique",
    options: [
      { label: "CRISPR/Cas9", value: "crispr", count: 127, selected: true },
      { label: "Prime Editing", value: "prime", count: 49, selected: false },
      { label: "TALEN", value: "talen", count: 33, selected: false },
      { label: "Base Editing", value: "base", count: 156, selected: false },
      {
        label: "Lipid Nanoparticles",
        value: "lipid",
        count: 80,
        selected: false,
      },
    ],
  },
  {
    name: "Organism / Cell Type",
    options: [
      { label: "HEK293", value: "hek293", count: 89, selected: false },
      { label: "iPSCs", value: "ipscs", count: 54, selected: false },
      { label: "Mouse", value: "mouse", count: 152, selected: false },
      { label: "Primary Cells", value: "primary", count: 239, selected: false },
      { label: "Clinical", value: "clinical", count: 91, selected: false },
    ],
  },
  {
    name: "Phase",
    options: [
      { label: "Research", value: "research", count: 289, selected: false },
      {
        label: "Preclinical",
        value: "preclinical",
        count: 156,
        selected: false,
      },
    ],
  },
  {
    name: "Difficulty",
    options: [
      { label: "Easy", value: "easy", count: 123, selected: false },
      { label: "Medium", value: "medium", count: 145, selected: false },
      { label: "Hard", value: "hard", count: 89, selected: false },
    ],
  },
  {
    name: "Estimated Time",
    options: [
      { label: "1-3 Days", value: "1-3", count: 145, selected: false },
      { label: "3-5 Days", value: "3-5", count: 164, selected: false },
      { label: "5+ Days", value: "5+", count: 38, selected: false },
    ],
  },
  {
    name: "Additional Options",
    options: [
      { label: "Has Files", value: "files", count: 347, selected: false },
      { label: "Has DOI", value: "files", count: 37, selected: false },
    ],
  },
];

// ---------filter category----------
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
  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const protocolsPerPage = 6;

  // Filter logic - simplified, in real app integrate with API
  const filteredProtocols = mockProtocols
    .filter(
      (protocol) =>
        protocol.tags.some((tag) =>
          activeFilters["technique"]?.includes(tag.toLowerCase())
        ) || Object.keys(activeFilters).length === 0
    )
    .slice(
      (currentPage - 1) * protocolsPerPage,
      currentPage * protocolsPerPage
    );

  const updateFilter = (category: string, value: string, selected: boolean) => {
    setActiveFilters((prev) => {
      const current = prev[category] || [];
      if (selected) {
        return { ...prev, [category]: [...current, value] };
      } else {
        return { ...prev, [category]: current.filter((v) => v !== value) };
      }
    });
  }; 

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* -------heading serarch bar---- */}
        <div className="max-w-3xl  gap-4">
          <h1 className="text-3xl font-bold text-[#1C1C1E] mb-4">
            Protocol Library
          </h1>
          <p className="text-[#636363] mb-8">
            Browse peer-reviewed protocols by technique, modality, organism, and
            phase.
          </p>

          {/* Search Bar */}
          <div className="mb-6 w-80 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search ..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          {/* Active Filters */}
          <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-lg">
            {/* Label */}
            <h3 className="font-medium text-gray-900 flex-shrink-0">
              Active filters:
            </h3>

            {/* Filter pills */}
            {["CRISPR/Cas9", "Gene Editing", "RNA-seq"].map((filter, idx) => (
              <button
                key={idx}
                className="flex items-center gap-2 bg-[#DDE9E5] px-3 py-1 rounded-[16px] text-black hover:bg-blue-100"
              >
                <span>{filter}</span>
                <X className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
        {/* ------------------filter content all here------------ */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Filters</h2>

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

          {/* ---------------------------------Main Content----------------- */}
          <div className="lg:col-span-3 space-y-8">
            {/* ----------feature potocals----------- */}
            <FeaturedPotocals />

            {/*------------ All Protocols -----------------*/}
            <div>
              <SectionHeader
                title=" All Protocols"
                subtitle=" Browse peer-reviewed protocols by technique, modality, organism,
                and phase."
              ></SectionHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredProtocols.map((protocol) => (
                  <div
                    key={protocol.id}
                    className="bg-[#F5F5F7] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                  >
                    {/* Header with techniques and BSL-2 */}
                    <div className="p-4 flex justify-between items-center">
                      {/* Techniques */}
                      <div className="flex flex-wrap gap-2">
                        {protocol.techniques.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-[#DDE9E5] text-black"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* BSL-2 Badge */}
                      <div className="inline-block bg-[#F8E0DF] text-[#FF3B30] px-2 py-1 rounded-full text-xs font-medium">
                        BSL-2
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 leading-tight">
                        {protocol.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {protocol.subtitle}
                      </p>

                      {/* Time and Level */}
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-[#636363] text-xs font-medium">
                          {protocol.time}
                        </span>

                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            protocol.level === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : protocol.level === "Hard"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {protocol.level}
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
                    <div className="px-6 py-4 ">
                      <button className="w-full py-3 px-4 bg-[#17AA80] hover:bg-[#148f68] text-white font-medium rounded-md transition-colors duration-200 text-sm">
                        {protocol.buttonText}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/*------------ Pagination ----------------------*/}
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50"
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {[1, 2, 3, 4, 5, 6].map((page) => (
                    <button
                      key={page}
                      className={`px-3 py-2 border border-gray-300 rounded ${
                        currentPage === page ? "bg-green-600 text-white" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-3 py-2 border border-gray-300 rounded">
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
