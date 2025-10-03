import React from "react";
import { FileText, Users, UserCheck, BookOpen } from "lucide-react";

const ApplicationProcess: React.FC = () => {
  const processSteps = [
    {
      id: 1,
      icon: "apply",
      title: "Apply",
      description:
        "Submit your application with required information and credentials",
      color: "bg-[#1D6953]",
    },
    {
      id: 2,
      icon: "review",
      title: "Admin Review",
      description: "Our team reviews your application and qualifications",
      color: "bg-[#1D6953]",
    },
    {
      id: 3,
      icon: "assignment",
      title: "Role Assignment",
      description: "Receive email confirmation with your assigned role",
      color: "bg-[#1D6953]",
    },
    {
      id: 4,
      icon: "onboarding",
      title: "Onboarding",
      description: "Access onboarding materials and start contributing",
      color: "bg-[#1D6953]",
    },
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "apply":
        return <FileText size={24} className="text-white" />;
      case "review":
        return <Users size={24} className="text-white" />;
      case "assignment":
        return <UserCheck size={24} className="text-white" />;
      case "onboarding":
        return <BookOpen size={24} className="text-white" />;
      default:
        return <FileText size={24} className="text-white" />;
    }
  };

  return (
    <div className="bg-gradient-to-b from-white-500 to-teal-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="">
        {/* ---------Header ----------------*/}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Application Process
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple steps to join our community and start contributing to genetic
            research
          </p>
        </div>

        {/*---------- Process Steps ----------*/}
        <div className="relative">
          {/* Desktop Layout - Horizontal */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between relative">
              {processSteps.map((step) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center max-w-xs"
                >
                  {/* Icon Circle */}
                  <div
                    className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-4 shadow-lg relative z-10`}
                  >
                    {getIcon(step.icon)}
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Layout - Vertical */}
          <div className="md:hidden space-y-8">
            {processSteps.map((step, index) => (
              <div key={step.id} className="flex items-start space-x-4">
                {/* Icon Circle */}
                <div
                  className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}
                >
                  {getIcon(step.icon)}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Line for Mobile */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-6 mt-12 w-0.5 h-8 bg-gray-300 -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProcess;
