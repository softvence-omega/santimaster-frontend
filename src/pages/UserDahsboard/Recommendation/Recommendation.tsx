import React from 'react';
import { User, Eye } from 'lucide-react';

interface ProtocolCardProps {
  title: string;
  description: string;
  author: {
    name: string;
    avatar?: string;
  };
  views: number;
  bslLevel: string;
}

const BSLBadge: React.FC<{ level: string }> = ({ level }) => {
  return (
    <span className="bg-red-100 text-red-600 border border-red-200 px-2 py-1 rounded text-xs font-medium">
      {level}
    </span>
  );
};

const ProtocolCard: React.FC<ProtocolCardProps> = ({
  title,
  description,
  author,
  views,
  bslLevel
}) => {
  return (
    <div className="bg-[#F5F5F7] rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-end mb-3">
        <BSLBadge level={bslLevel} />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
        {title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-gray-700 font-medium">{author.name}</span>
        </div>
        
        <div className="flex items-center space-x-1 text-gray-500">
          <Eye className="w-4 h-4" />
          <span className="text-sm">{views} views</span>
        </div>
      </div>
    </div>
  );
};

const RecommendedForYou: React.FC = () => {
  const recommendedProtocols: ProtocolCardProps[] = [
    {
      title: "Advanced DNA Extraction Methods",
      description: "Comprehensive guide for high-purity genomic DNA extraction from various sample types.",
      author: {
        name: "Dr. Sarah Chen"
      },
      views: 342,
      bslLevel: "BSL-1"
    },
    {
      title: "Cell Culture Optimization",
      description: "Step-by-step protocol for optimizing mammalian cell culture conditions for maximum viability.",
      author: {
        name: "Dr. Emily Zhang"
      },
      views: 189,
      bslLevel: "BSL-1"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Recommended for You</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendedProtocols.map((protocol, index) => (
          <ProtocolCard key={index} {...protocol} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedForYou;