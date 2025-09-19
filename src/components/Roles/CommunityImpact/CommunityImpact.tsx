import React from "react";
import SectionHeader from "../../../utils/SectionHeading";

const CommunityImpact: React.FC = () => {
  // JSON data for statistics
  const statistics = [
    {
      id: 1,
      number: "1,247",
      label: "Protocols Published",
      color: "text-[#1D6953]",
    },
    {
      id: 2,
      number: "3,892",
      label: "Active Researchers",
      color: "text-[#1D6953]",
    },
    {
      id: 3,
      number: "89",
      label: "Countries Represented",
      color: "text-[#1D6953]",
    },
    {
      id: 4,
      number: "47,382",
      label: "Protocol Downloads",
      color: "text-[#1D6953]",
    },
  ];

  // JSON data for testimonials
  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "Lead Researcher, Stanford University",
      quote:
        "Open Gene has revolutionized how we share and validate protocols. The peer review process ensures quality while the open access model accelerates discovery across institutions.",
      contribution: "Contributed 23 protocols",
      avatar:
        "https://www.ultimatebeaver.com/wp-content/uploads/bb-plugin/cache/photo-gallery-img-02-circle.jpg",
    },
    {
      id: 2,
      name: "Dr. Marcus Johnson",
      title: "Clinical Geneticist, Mayo Clinic",
      quote:
        "As a reviewer, I appreciate the rigorous standards and collaborative approach. Every protocol I review contributes to safer, more reproducible genetic research worldwide.",
      contribution: "Reviewed 156 protocols",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  return (
    <div className="bg-[#E8F0EE] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionHeader
            title=" Community Impact"
            subtitle=" See how our community is advancing genetic research and
            democratizing scientific knowledge"
          ></SectionHeader>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {statistics.map((stat) => (
            <div key={stat.id} className="text-center">
              <div
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${stat.color} mb-3`}
              >
                {stat.number}
              </div>
              <div className="text-gray-600 text-lg font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#1D6953] rounded-lg p-8 text-white"
            >
              {/* Profile Section */}
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-[#F5F5F7],  Stanford University] text-sm">
                    {testimonial.title}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-white text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Contribution */}
              <div className="text-[#F5F5F7] text-sm font-medium">
                {testimonial.contribution}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityImpact;
