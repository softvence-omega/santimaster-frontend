import React from "react";
import { X } from "lucide-react";

interface ProjectDetailModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  project?: any;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  isOpen = true,
  onClose = () => {},
  project,
}) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {project.status}
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {project.title}
          </h1>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress
              </span>
              <span className="text-sm text-gray-500">
                {project.completion}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${project.completion}%` }}
              ></div>
            </div>
          </div>

          {/* Team */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Team</h3>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {project.team}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Target Date
              </h3>
              <span className="text-gray-600">{project.date}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
