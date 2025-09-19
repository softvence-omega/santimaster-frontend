import React from 'react';
import { X, Check } from 'lucide-react';

interface ProjectDetailModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  project?: any;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ 
  isOpen = true, 
  onClose = () => {},
  project
}) => {
  if (!isOpen) return null;

  const acceptanceCriteria = [
    'Filters work with AND/OR logic and are bookmarkable',
    'Page loads under 1.5 seconds with 200+ protocols and caching',
    'Schema markup implemented for SEO',
    'Submission workflow tested with reviewer permissions'
  ];

  const dependencies = [
    { name: 'Database schema migration', status: 'Complete', statusColor: 'text-green-600' },
    { name: 'User authentication system', status: 'In Progress', statusColor: 'text-blue-600' }
  ];

  const relatedLinks = [
    { name: 'MVP Page Section', url: '#' },
    { name: 'Protocol Library Design', url: '#' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              In Progress
            </span>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            MVP Release Candidate
          </h1>

          {/* Progress Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-500">85% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          {/* Owner and Theme */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Owner</h3>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">SC</span>
                </div>
                <span className="text-blue-600 font-medium">Sarah Chen</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Theme</h3>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                Protocol Library
              </span>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Target Date</h3>
              <p className="text-gray-600">March 15, 2024</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Start Date</h3>
              <p className="text-gray-600">January 8, 2024</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              Complete development of the MVP release candidate including the Protocol 
              Library with advanced search and filtering capabilities, front-end submission 
              workflow for contributors, and reviewer publishing flow with proper permissions 
              and validation.
            </p>
          </div>

          {/* Acceptance Criteria */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Acceptance Criteria</h3>
            <div className="space-y-3">
              {acceptanceCriteria.map((criteria, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    {criteria}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dependencies */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dependencies</h3>
            <div className="space-y-4">
              {dependencies.map((dependency, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">• {dependency.name}</span>
                  <span className={`text-sm font-medium ${dependency.statusColor}`}>
                    {dependency.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Links</h3>
            <div className="space-y-2">
              {relatedLinks.map((link, index) => (
                <div key={index}>
                  <a href={link.url} className="text-blue-600 hover:text-blue-800 hover:underline">
                    {link.name}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Risks & Notes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risks & Notes</h3>
            <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
              <p className="text-gray-700 text-sm leading-relaxed">
                Performance testing with large datasets is critical. Need to ensure caching 
                strategy is properly implemented before launch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;