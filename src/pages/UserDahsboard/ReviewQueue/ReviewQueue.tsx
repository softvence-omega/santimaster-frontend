import React from 'react';
import { ChevronDown, User } from 'lucide-react';

interface FilterDropdownProps {
  label: string;
  value: string;
}

interface ReviewItemProps {
  title: string;
  description: string;
  reviewer: {
    name: string;
    avatar?: string;
  };
  priority: 'High' | 'Medium' | 'Low';
  submitted: string;
  bslLevel: string;
  status: string;
  dueDate?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ value }) => {
  return (
    <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50">
      <span className="text-sm text-gray-700">{value}</span>
      <ChevronDown className="w-4 h-4 text-gray-500" />
    </div>
  );
};

const BSLBadge: React.FC<{ level: string }> = ({ level }) => {
  return (
    <span className="bg-red-100 text-red-700 border border-red-200 px-2 py-1 rounded text-xs font-medium">
      {level}
    </span>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = () => {
    if (status === 'Advanced') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (status === 'Intermediate') return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor()}`}>
      {status}
    </span>
  );
};

const ReviewItem: React.FC<ReviewItemProps> = ({
  title,
  description,
  reviewer,
  priority,
  submitted,
  bslLevel,
  status,
  dueDate
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex space-x-2">
          <BSLBadge level={bslLevel} />
          <StatusBadge status={status} />
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-gray-900">{reviewer.name}</span>
        </div>
        
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <span className="font-medium">Priority:</span>
            <span className={`${
              priority === 'High' ? 'text-red-600 font-medium' : 
              priority === 'Medium' ? 'text-yellow-600 font-medium' : 
              'text-green-600 font-medium'
            }`}>
              {priority}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <span className="font-medium">Submitted:</span>
            <span>{submitted}</span>
          </div>
          
          {dueDate && (
            <div className="flex items-center space-x-1">
              <span className="font-medium">Due in:</span>
              <span>{dueDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ReviewQueue: React.FC = () => {
  const reviewItems: ReviewItemProps[] = [
    {
      title: "Metabolic Engineering in Yeast",
      description: "Protocol for engineering metabolic pathways in Saccharomyces cerevisiae for enhanced production...",
      reviewer: {
        name: "Dr. David Thompson"
      },
      priority: "High",
      submitted: "2 days ago",
      bslLevel: "BSL-2",
      status: "Advanced"
    },
    {
      title: "Fluorescence Microscopy Imaging",
      description: "Comprehensive guide for live-cell fluorescence microscopy with photobleaching prevention...",
      reviewer: {
        name: "Dr. Jennifer Park"
      },
      priority: "Medium",
      submitted: "1 day ago",
      bslLevel: "BSL-1",
      status: "Intermediate"
    },
    {
      title: "Stem Cell Differentiation Protocol",
      description: "Protocol for directed differentiation of pluripotent stem cells into neural lineages...",
      reviewer: {
        name: "Dr. Michael Brown"
      },
      priority: "High",
      submitted: "5 days ago",
      bslLevel: "BSL-2",
      status: "Advanced",
      dueDate: "2 days"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Review Queue</h1>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          5 protocols awaiting review
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mb-6">
        <span className="text-sm text-gray-600 font-medium">Filter by:</span>
        <div className="flex items-center space-x-2">
          <FilterDropdown label="Protocol Type" value="All Protocols" />
        </div>
        
        <span className="text-sm text-gray-600 font-medium">BSL Level:</span>
        <div className="flex items-center space-x-2">
          <FilterDropdown label="BSL Level" value="All Levels" />
        </div>
        
        <span className="text-sm text-gray-600 font-medium">Difficulty:</span>
        <div className="flex items-center space-x-2">
          <FilterDropdown label="Difficulty" value="All Levels" />
        </div>
      </div>
      
      <div className="space-y-4">
        {reviewItems.map((item, index) => (
          <ReviewItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ReviewQueue;