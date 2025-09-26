import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import ProjectDetailModal from "./ProjectRiadmapDetails";

const ProjectRoadmap = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupBy, setGroupBy] = useState("Phase");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const phases = [
    {
      id: 1,
      name: "MVP Phase",
      target: "Target: Q1 2024",
      projects: [
        {
          id: 1,
          title: "MVP Release Candidate",
          description:
            "Protocol Library with search & filters, submission flow, reviewer publish workflow",
          status: "In Progress",
          completion: 85,
          team: "Protocol Library",
          date: "May 15, 2024",
          statusColor: "bg-blue-500",
        },
        {
          id: 2,
          title: "Advanced Search & Filtering",
          description:
            "Caché/CDN implementation, image compression, E2M integration with privacy-friendly banner",
          status: "Planned",
          completion: 0,
          team: "Platform",
          date: "Apr 1, 2024",
          statusColor: "bg-gray-400",
        },
        {
          id: 3,
          title: "Donations & Support",
          description:
            "GiveWP/Stripe integration for donation page and CTA wiring across platform",
          status: "Blocked",
          completion: 35,
          team: "Fundraising",
          date: "Mar 30, 2024",
          statusColor: "bg-red-500",
        },
      ],
    },
    {
      id: 2,
      name: "Phase 2",
      target: "Target: Q2-Q3 2024",
      projects: [
        {
          id: 4,
          title: "Roles & Permissions Hardening",
          description:
            "Advanced role management, reviewer publishing rights, contributor restrictions with QA",
          status: "Planned",
          completion: 24,
          team: "Governance",
          date: "May 15, 2024",
          statusColor: "bg-gray-400",
        },
        {
          id: 5,
          title: "Advanced Search & Filtering",
          description:
            "Enhanced protocol discovery with advanced filters,tags and AI-powered recommendations",
          status: "Planned",
          completion: 33,
          team: "Protocol Library",
          date: "Jan 1, 2024",
          statusColor: "bg-gray-400",
        },
        {
          id: 6,
          title: "Collaboration Tools",
          description:
            "Real-time editing, commenting system, version control for protocol development",
          status: "Blocked",
          completion: 23,
          team: "Collaboration",
          date: "Jun 15, 2024",
          statusColor: "bg-red-500",
        },
      ],
    },
    {
      id: 3,
      name: "Phase 3",
      target: "Target: Q4 2024",
      projects: [
        {
          id: 7,
          title: "API Ecosystem",
          description:
            "Public API for protocol access, third-party integrations, developer portal",
          status: "Planned",
          completion: 33,
          team: "Platform",
          date: "Jan 1, 2024",
          statusColor: "bg-gray-400",
        },
        {
          id: 8,
          title: "Mobile Application",
          description:
            "Native mobile app for iOS and Android with offline protocol access",
          status: "Planned",
          completion: 0,
          team: "Mobile",
          date: "Nov 15, 2024",
          statusColor: "bg-gray-400",
        },
      ],
    },
  ];

  const getStatusBadge = (status: any) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Planned":
        return "bg-gray-100 text-gray-800";
      case "Blocked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCompletionText = (status: any, completion: any) => {
    if (status === "Planned" && completion === 0) return "0% Complete";
    return `${completion}% Complete`;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          {/* Search box */}
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search milestones..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Dropdown filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-4 sm:gap-0 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <select
                className="appearance-none bg-[#EDEDEF] border border-gray-300 rounded px-4 py-2 pr-8 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
              >
                <option>Group by: Phase</option>
                <option>Group by: Status</option>
                <option>Group by: Team</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                className="appearance-none bg-[#EDEDEF] border border-gray-300 rounded px-4 py-2 pr-8 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Statuses</option>
                <option>In Progress</option>
                <option>Planned</option>
                <option>Blocked</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Phase Sections */}
        {phases.map((phase) => (
          <div key={phase.id} className="mb-8">
            {/* Phase Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#1D6953] text-white px-4 py-2 rounded-lg font-medium">
                {phase.name}
              </div>
              <div className="text-gray-600 font-medium">{phase.target}</div>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {phase.projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => openModal(project)}
                >
                  {/* Status and Completion */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {getCompletionText(project.status, project.completion)}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.completion}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Team and Date */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="font-medium">{project.team}</span>
                    <span>{project.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectDetailModal
            isOpen={isModalOpen}
            onClose={closeModal}
            project={selectedProject}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectRoadmap;
