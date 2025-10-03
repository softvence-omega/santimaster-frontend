import React from "react";
import { Check, FileText, Users, MessageCircle } from "lucide-react";
import SectionHeader from "../../../utils/SectionHeading";

const ReviewerOnboarding: React.FC = () => {
  // JSON data for onboarding checklist
  const checklistItems = [
    {
      id: 1,
      title: "Confidentiality Agreement",
      description: "Sign NDA for protocol review process",
      completed: true,
    },
    {
      id: 2,
      title: "Safety Screening Training",
      description: "Complete biosafety and ethics modules",
      completed: true,
    },
    {
      id: 3,
      title: "Conflict of Interest Declaration",
      description: "Disclose any potential conflicts",
      completed: true,
    },
    {
      id: 4,
      title: "Review Time Targets",
      description: "Commit to 7-14 day review turnaround",
      completed: true,
    },
  ];

  // JSON data for resources and support
  const resources = [
    {
      id: 1,
      icon: "document",
      title: "Reviewer Guide (PDF)",
      description: "Complete review guidelines and criteria",
      color: "bg-[#1D6953]",
    },
    {
      id: 2,
      icon: "admin",
      title: "Admin Contact",
      description: "Direct line to review team coordinators",
      color: "bg-[#1D6953]",
    },
    {
      id: 3,
      icon: "community",
      title: "Reviewer Community",
      description: "Private forum for reviewer discussions",
      color: "bg-[#1D6953]",
    },
  ];

  const getResourceIcon = (iconType: string) => {
    switch (iconType) {
      case "document":
        return <FileText size={20} className="text-white" />;
      case "admin":
        return <Users size={20} className="text-white" />;
      case "community":
        return <MessageCircle size={20} className="text-white" />;
      default:
        return <FileText size={20} className="text-white" />;
    }
  };

  return (
    <div className=" py-16 px-4 sm:px-6 lg:px-8">
      <div className="">
        <SectionHeader
          title="  Reviewer Onboarding & Expectations"
          subtitle=" Special requirements and responsibilities for our peer review team"
        ></SectionHeader>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Onboarding Checklist */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Onboarding Checklist
            </h2>

            <div className="space-y-6">
              {checklistItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  {/* Check Icon */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      item.completed ? "bg-[#1D6953]" : "bg-gray-200"
                    }`}
                  >
                    {item.completed && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources & Support */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Resources & Support
            </h2>

            <div className="space-y-6">
              {resources.map((resource) => (
                <div key={resource.id} className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 ${resource.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    {getResourceIcon(resource.icon)}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {resource.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Workflow Impact Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Review Workflow Impact
          </h2>

          <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-600">
            <p className="text-gray-700 leading-relaxed">
              As a Reviewer, you play a crucial role in maintaining the quality
              and safety of protocols on our platform. You'll review submitted
              drafts in the admin queue, provide detailed feedback, and publish
              approved protocols when they meet our standards. Your expertise
              ensures that only validated, safe, and reproducible protocols
              reach our community of researchers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewerOnboarding;
