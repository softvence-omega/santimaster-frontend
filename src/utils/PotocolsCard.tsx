import { Clock } from "lucide-react";

// Define TypeScript interfaces
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

// ✅ Reusable Card Component
const ProtocolCard: React.FC<{ protocol: Protocol }> = ({ protocol }) => {
  return (
    <div className="bg-[#F5F5F7] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      {/* Header */}
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

        {/* BSL Badge (static for now, can be passed later) */}
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

        {/* Time + Level */}
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

      {/* Footer */}
      <div className="px-6 py-4">
        <button className="w-full py-3 px-4 bg-[#17AA80] hover:bg-[#148f68] text-white font-medium rounded-md transition-colors duration-200 text-sm">
          {protocol.buttonText}
        </button>
      </div>
    </div>
  );
};

// ================== Usage ==================
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
  // ... more mock data
];

const PotocalCard = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Grid of reusable cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProtocols.map((protocol) => (
          <ProtocolCard key={protocol.id} protocol={protocol} />
        ))}
      </div>

      {/* CTA button */}
      <div className="mt-8 text-center">
        <button className="gap-2 px-7 py-4 border border-[#17AA80] rounded-lg text-[#17AA80] font-normal hover:bg-[#17AA80] hover:text-white transition-colors duration-200">
          See More
        </button>
      </div>
    </div>
  );
};

export default PotocalCard;
