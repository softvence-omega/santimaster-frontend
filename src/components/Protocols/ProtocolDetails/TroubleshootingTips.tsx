import React from "react";
import { AlertTriangle, Lightbulb, Shield, CheckCircle } from "lucide-react";

interface TipItem {
  text: string;
}

interface TroubleshootingSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  items: TipItem[];
  bgColor: string;
  borderColor: string;
  iconColor: string;
  textColor: string;
}

const TroubleshootingTips: React.FC = () => {
  const sections: TroubleshootingSection[] = [
    {
      id: "low-transfection",
      title: "Low Transfection Efficiency",
      icon: <AlertTriangle className="w-6 h-6" />,
      description:
        "If transfection efficiency is below 60%, consider the following:",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      iconColor: "text-amber-600",
      textColor: "text-amber-800",
      items: [
        { text: "Check cell confluence (should be 70-80%)" },
        { text: "Verify plasmid quality and concentration" },
        { text: "Optimize DNA:lipofectamine ratio" },
        { text: "Ensure cells are healthy and in log phase" },
      ],
    },
    {
      id: "optimization",
      title: "Optimization Tips",
      icon: <Lightbulb className="w-6 h-6" />,
      description: "Best practices for improved results:",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      textColor: "text-blue-800",
      items: [
        { text: "Pre-warm all media and reagents to room temperature" },
        { text: "Use fresh Lipofectamine 3000 for best results" },
        { text: "Consider using antibiotic-free medium during transfection" },
        { text: "Validate gRNA activity using in vitro cleavage assays" },
      ],
    },
    {
      id: "safety",
      title: "Safety Considerations",
      icon: <Shield className="w-6 h-6" />,
      description: "Important safety protocols to follow:",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-600",
      textColor: "text-red-800",
      items: [
        { text: "Always work in a certified BSL-2 facility" },
        {
          text: "Dispose of all materials according to institutional guidelines",
        },
        {
          text: "Wear appropriate PPE including lab coat, gloves, and safety glasses",
        },
        { text: "Decontaminate work surfaces with 10% bleach solution" },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2
        className="text-[#0A251D] text-center font-semibold leading-normal
           text-2xl sm:text-3xl md:text-4xl lg:text-[48px] m-6"
      >
        Troubleshooting & Tips
      </h2>
      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`${section.bgColor} ${section.borderColor} border-l-4 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200`}
          >
            {/* ----------------- Section Header --------------------------------------*/}
            <div className="flex items-center gap-3 mb-4">
              <div className={`${section.iconColor} flex-shrink-0`}>
                {section.icon}
              </div>
              <div>
                <h3
                  className={`text-lg font-semibold  text-[#1C1C1E] [${section.textColor}`}
                >
                  {section.title}
                </h3>
                <p className={`text-sm ${section.textColor} opacity-80 mt-1`}>
                  {section.description}
                </p>
              </div>
            </div>

            {/* Tips List */}
            <ul className="space-y-3 ml-9">
              {section.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle
                    className={`w-4 h-4 ${section.iconColor} mt-0.5 flex-shrink-0`}
                  />
                  <span
                    className={`${section.textColor} text-sm leading-relaxed`}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TroubleshootingTips;
