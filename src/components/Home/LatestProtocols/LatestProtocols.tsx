import SectionHeader from "../../../utils/SectionHeading";
import { Clock } from "lucide-react"; // <-- Lucide icon import

// Define TypeScript interfaces for our data
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

// Static mock data
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

const LatestProtocols = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <SectionHeader
        title="Latest Protocols"
        subtitle="Recently reviewed and published protocols from our community of rese"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProtocols.map((protocol) => (
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

      <div className="mt-8 text-center">
        <button className=" gap-2 px-7 py-4 border border-[#17AA80] rounded-lg text-[#17AA80] font-normal hover:bg-[#17AA80] hover:text-white transition-colors duration-200">
          See More
        </button>
      </div>
    </div>
  );
};

export default LatestProtocols;
