import { CheckCircle } from "lucide-react";
import Usecaseimg from "../../../assets/Mvp/usecaseimage.png";
import SectionHeader from "../../../utils/SectionHeading";
import communityicon from "../../../assets/icon/community.png";
import libaryicon from "../../../assets/icon/libary.png";

export default function UseCase() {
  return (
    <div className="py-28 px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <SectionHeader
          title="Target Users & Use Cases"
          subtitle="Designed for the diverse needs of the research community"
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-start gap-16">
        {/* Left Side - Image */}
        <div className="flex justify-center lg:justify-start flex-shrink-0 mb-10">
          <img
            className="w-full max-w-[576px] h-auto lg:h-[639px] object-contain"
            src={Usecaseimg}
            alt="Usecase"
          />
        </div>

        {/* Researchers Section */}
        <div className="flex flex-col w-full max-w-[426px] lg:translate-y-28 p-8 md:p-10 gap-8 rounded-lg bg-[#F5F5F7] flex-shrink-0">
          <div className="bg-green-800 rounded-full w-12 h-12 flex items-center justify-center ">
            <img className="w-6 h-6" src={libaryicon} alt="Library Icon" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Researchers</h2>

          <div className="space-y-6">
            {[
              "Quick discoverability of relevant protocols through advanced search",
              "Easy submission process with draft saving and progress tracking",
              "Access to peer-reviewed, validated protocols from global community",
              "Contribution tracking and academic recognition for shared protocols",
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-4 group">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0 group-hover:bg-green-200 transition-colors">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviewers Section */}
        <div className="flex flex-col translate-y-42 w-full max-w-[426px] p-8 md:p-10 gap-8 rounded-lg bg-[#F5F5F7] flex-shrink-0">
          <div className="bg-green-800 rounded-full w-12 h-12 flex items-center justify-center">
            <img className="w-6 h-6" src={communityicon} alt="Community Icon" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Reviewers</h2>

          <div className="space-y-6">
            {[
              "Streamlined dashboard to manage review queue and track progress",
              "Structured feedback system with standardized evaluation criteria",
              "Version comparison tools for tracking protocol revisions and improvements",
              "Recognition system for peer review contributions to the community",
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-4 group">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0 group-hover:bg-green-200 transition-colors">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
