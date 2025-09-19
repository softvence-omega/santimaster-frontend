import { Check } from "lucide-react";
import SectionHeader from "../../../utils/SectionHeading";

const ReleaseNotes = () => {
  const releases = [
    {
      version: "v1.2.0",
      date: "Feb 28, 2024",
      title: "Enhanced Search Functionality",
      features: [
        "Advanced filtering with logic",
        "Full-text search across protocol",
        "Improved search performance",
      ],
    },
    {
      version: "v1.1.5",
      date: "Feb 15, 2024",
      title: "Security & Performance Updates",
      features: [
        "Enhanced security measures",
        "Page load time improvements",
        "Bug fixes and stability improve",
      ],
    },
    {
      version: "V1.1.0",
      date: "Jan 30, 2024",
      title: "User Interface Overhaul",
      features: [
        "Redesigned protocol cards",
        "Improved mobile responsiveness",
        "Dark mode support",
      ],
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <SectionHeader
            title="Release Notes"
            subtitle="Latest updates and shipped features"
          />
        </div>

        {/* Release Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {releases.map((release, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              {/* Version and Date */}
              <div className="flex items-center justify-between mb-6">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {release.version}
                </span>
                <span className="text-gray-500 text-sm">{release.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-tight">
                {release.title}
              </h3>

              {/* Features List */}
              <div className="space-y-4">
                {release.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-5 h-5 bg-[#1D6953] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </div>
                    </div>
                    <span className="text-gray-600 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReleaseNotes;
